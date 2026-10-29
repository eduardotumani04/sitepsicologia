import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { createSeoSettings, pageMetadata, siteRobots, siteSitemap } from "../src/lib/seo";
import { articles } from "../workbench/editorial/lib/articles";
import { contact, getContactChannels, type ContactInformation } from "../src/lib/contact";

declare global {
  interface Window { __auditCls: number; }
}

const disabledRoutes = ["/conteudos/", ...articles.map(article => `/conteudos/${article.slug}/`)];
const routes = ["/", "/sobre/", "/psicoterapia/", "/avaliacao-psicologica/", "/contato/", "/privacidade/"];

for (const route of routes) {
  test(`exportação, metadados e acessibilidade: ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page).toHaveTitle(/Eduardo Villela Tumani/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("links internos levam a páginas exportadas", async ({ page, request }) => {
  const destinations = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const hrefs = await page.locator("a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    for (const href of hrefs) {
      expect(href).toBeTruthy();
      expect(href).not.toBe("#");
      if (href?.startsWith("/")) destinations.add(href);
      if (href?.startsWith("#")) await expect(page.locator(href)).toHaveCount(1);
    }
  }
  for (const href of destinations) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
});

test("SEO possui títulos exclusivos, Open Graph individual e hierarquia sem saltos", async ({ page }) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  let origin: string | null = null;
  for (const route of routes) {
    await page.goto(route);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(titles.has(title), route).toBe(false);
    expect(descriptions.has(description ?? ""), route).toBe(false);
    titles.add(title);
    descriptions.add(description ?? "");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", description ?? "");
    const levels = await page.getByRole("main").locator("h1,h2,h3,h4,h5,h6").evaluateAll(headings => headings.map(heading => Number(heading.tagName.slice(1))));
    expect(levels[0]).toBe(1);
    for (let index = 1; index < levels.length; index++) expect(levels[index]).toBeLessThanOrEqual(levels[index - 1] + 1);
    const canonical = page.locator('link[rel="canonical"]');
    if (await canonical.count()) {
      const href = await canonical.getAttribute("href");
      const url = new URL(href!);
      origin ??= url.origin;
      expect(url.origin).toBe(origin);
      expect(url.protocol).toBe("https:");
      expect(url.pathname).toBe(route);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", href!);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `${origin}/opengraph.png`);
    } else {
      expect(origin).toBeNull();
      await expect(page.locator('meta[property="og:url"]')).toHaveCount(0);
      await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);
    }
  }
});

test("sitemap e robots são exportados e excluem conteúdos sem aprovação", async ({ page, request }) => {
  const robots = await request.get("/robots.txt");
  const sitemap = await request.get("/sitemap.xml");
  expect(robots.status()).toBe(200);
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  await page.goto("/");
  const parsed = await page.evaluate(source => {
    const xml = new DOMParser().parseFromString(source, "application/xml");
    return { errors: xml.querySelectorAll("parsererror").length, urls: [...xml.querySelectorAll("loc")].map(node => node.textContent!) };
  }, xml);
  expect(parsed.errors).toBe(0);
  if (!parsed.urls.length) {
    expect(await robots.text()).toContain("Disallow: /");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  } else {
    expect(await robots.text()).toContain("Sitemap:");
    for (const url of parsed.urls) {
      const path = new URL(url).pathname;
      expect(path).not.toMatch(/^\/conteudos(?:\/|$)/);
      expect(path).not.toBe("/privacidade/");
      expect((await request.get(path)).status()).toBe(200);
    }
  }
});

test("configuração SEO valida origem oficial e não presume domínio ou endereço", () => {
  const review = createSeoSettings({});
  expect(review).toEqual({ url: null, indexingEnabled: false });
  expect(siteSitemap(review)).toEqual([]);
  expect(siteRobots(review)).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  expect(() => createSeoSettings({ SITE_URL: "http://example.com" })).toThrow();
  expect(() => createSeoSettings({ SITE_URL: "https://example.com/caminho" })).toThrow();
  const credentialed = "https://" + ["usuario", "senha-ficticia"].join(":") + "@example.com";
  expect(() => createSeoSettings({ SITE_URL: credentialed })).toThrow();
  expect(() => createSeoSettings({ SITE_INDEXING_ENABLED: "true" })).toThrow();
  const configured = createSeoSettings({ SITE_URL: "https://example.com/", SITE_INDEXING_ENABLED: "true" });
  expect(pageMetadata({ title: "Sobre mim", description: "Descrição de teste", path: "/sobre/" }, configured)).toMatchObject({
    alternates: { canonical: "https://example.com/sobre/" },
    openGraph: { url: "https://example.com/sobre/", title: "Sobre mim | Eduardo Villela Tumani" },
  });
  expect(siteSitemap(configured).map(entry => new URL(entry.url).pathname)).toEqual(["/", "/sobre/", "/psicoterapia/", "/avaliacao-psicologica/", "/contato/"]);
});

test("dados estruturados descrevem somente a identidade profissional verificável", async ({ page }) => {
  await page.goto("/");
  const data = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(data).toMatchObject({ "@type": "Person", name: "Eduardo Villela Tumani", jobTitle: "Psicólogo", identifier: { propertyID: "CRP", value: "06/127526" } });
  for (const key of ["address", "location", "geo", "aggregateRating", "review", "telephone"]) expect(data).not.toHaveProperty(key);
});

test("menu fecha ao sair por Tab e ao mudar para desktop, com foco visível", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.locator(".menu-toggle");
  const navigation = page.locator("#mobile-navigation");
  await toggle.click();
  await navigation.getByRole("link", { name: "Contato", exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(navigation).toBeHidden();
  const heroLink = page.getByRole("link", { name: "Conheça meu trabalho", exact: true });
  await expect(heroLink).toBeFocused();
  await expect(heroLink).toBeInViewport();
  expect(await heroLink.evaluate(element => getComputedStyle(element).outlineStyle)).toBe("solid");
  await toggle.click();
  await navigation.getByRole("link", { name: "Sobre mim", exact: true }).focus();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(navigation).toBeHidden();
  await expect(page.locator(".brand")).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("movimento reduzido é respeitado e links não carregam outras páginas antecipadamente", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const fetched: string[] = [];
  page.on("request", request => { if (request.resourceType() === "fetch") fetched.push(new URL(request.url()).pathname); });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.waitForLoadState("networkidle");
  expect(fetched).toEqual([]);
  expect(await page.locator("html").evaluate(element => getComputedStyle(element).scrollBehavior)).toBe("auto");
  const duration = await page.locator(".button").first().evaluate(element => getComputedStyle(element).transitionDuration);
  expect(duration.split(",").every(value => Number.parseFloat(value) === 0)).toBe(true);
});

test("CSP exportada permite a aplicação e bloqueia scripts sem hash", async ({ page }) => {
  const blocked: string[] = [];
  const runtime: string[] = [];
  page.on("console", message => { if (/content security policy|refused to execute/i.test(message.text())) blocked.push(message.text()); });
  page.on("pageerror", error => runtime.push(error.message));
  await page.route("**/*", async route => {
    const response = await route.fetch();
    if ((response.headers()["content-type"] ?? "").includes("text/html")) {
      const path = new URL(route.request().url()).pathname;
      const directory = path.endsWith("/") ? path : "/";
      const config = await readFile(join(process.cwd(), "out", directory, ".htaccess"), "utf8");
      const csp = config.match(/Header always set Content-Security-Policy "([^"]+)"/);
      expect(csp).not.toBeNull();
      expect(csp![1]).not.toMatch(/script-src[^;]*'unsafe-inline'/);
      expect(csp![1]).not.toContain("unsafe-eval");
      await route.fulfill({ response, headers: { ...response.headers(), "content-security-policy": csp![1] } });
    } else await route.fulfill({ response });
  });
  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator(".menu-toggle").click();
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await page.locator("#mobile-navigation").getByRole("link", { name: "Contato", exact: true }).click();
  await expect(page).toHaveURL(/\/contato\/$/);
  expect(runtime).toEqual([]);
  expect(blocked).toEqual([]);
  await page.evaluate(() => { const script = document.createElement("script"); script.textContent = "window.__untrustedAuditScript = true"; document.body.append(script); });
  await expect.poll(() => blocked.length).toBeGreaterThan(0);
  expect(await page.evaluate(() => "__untrustedAuditScript" in window)).toBe(false);
});

test("fontes locais e estabilidade visual em carregamento com atraso de fonte", async ({ page }, testInfo) => {
  const samples = [];
  await page.addInitScript(() => {
    const audit = window;
    audit.__auditCls = 0;
    new PerformanceObserver(list => {
      for (const raw of list.getEntries()) {
        const entry = raw as PerformanceEntry & { value: number; hadRecentInput: boolean };
        if (!entry.hadRecentInput) audit.__auditCls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.route("**/*.woff2", async route => {
    await new Promise(resolve => setTimeout(resolve, 200));
    await route.continue();
  });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const sample = await page.evaluate(() => {
      const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
      return {
        width: innerWidth,
        cls: window.__auditCls,
        fonts: resources.filter(entry => new URL(entry.name).pathname.endsWith(".woff2")).map(entry => ({ path: new URL(entry.name).pathname, bytes: entry.encodedBodySize })),
        javascriptBytes: resources.filter(entry => new URL(entry.name).pathname.endsWith(".js")).reduce((sum, entry) => sum + entry.encodedBodySize, 0),
      };
    });
    expect(sample.cls).toBeLessThanOrEqual(0.1);
    expect(sample.fonts).toHaveLength(1);
    expect(sample.fonts[0].bytes).toBeGreaterThan(0);
    expect(sample.fonts[0].bytes).toBeLessThan(30_000);
    samples.push(sample);
  }
  await testInfo.attach("desempenho-local.json", { body: JSON.stringify(samples, null, 2), contentType: "application/json" });
  console.log(`DESEMPENHO_LOCAL ${JSON.stringify(samples)}`);
});

test("arquivos de hospedagem e imagem social estão na exportação", async ({ request }) => {
  const config = await readFile("out/.htaccess", "utf8");
  expect(config).toContain("ErrorDocument 404 /404.html");
  expect(config).toContain("Options -Indexes");
  expect(config).toContain('X-Content-Type-Options "nosniff"');
  expect(config).not.toContain("RewriteRule");
  expect(await readFile("out/_next/static/.htaccess", "utf8")).toContain("immutable");
  expect((await request.get("/fonts/OFL.txt")).status()).toBe(200);
  const image = await request.get("/opengraph.png");
  expect(image.status()).toBe(200);
  const buffer = await image.body();
  expect(buffer.readUInt32BE(16)).toBe(1200);
  expect(buffer.readUInt32BE(20)).toBe(630);
  for (const path of ["/package.json", "/.env", "/.git/config"]) expect([403, 404]).toContain((await request.get(path)).status());
});

test("Apache aplica segurança, cache e página 404 da configuração Hostinger", async ({ request }) => {
  test.skip(!process.env.PLAYWRIGHT_BASE_URL, "Requer servidor Apache de teste ou hospedagem configurada; o preview simples não interpreta .htaccess.");
  const home = await request.get("/");
  expect(home.status()).toBe(200);
  expect(home.headers()["x-content-type-options"]).toBe("nosniff");
  expect(home.headers()["x-frame-options"]).toBe("DENY");
  expect(home.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(home.headers()["permissions-policy"]).toContain("microphone=()");
  expect(home.headers()["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(home.headers()["cache-control"]).toContain("must-revalidate");
  const html = await home.text();
  const font = html.match(/href="([^\"]+\.woff2)"/);
  expect(font).not.toBeNull();
  expect((await request.get(font![1])).headers()["cache-control"]).toContain("immutable");
  const script = html.match(/src="([^\"]+\.js)"/);
  expect(script).not.toBeNull();
  expect((await request.get(script![1])).headers()["content-encoding"]).toMatch(/gzip|br/);
  const missing = await request.get("/pagina-ausente/");
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toContain("Vamos encontrar");
  expect((await request.get("/.htaccess")).status()).toBe(403);
});

test("Conteúdos e rascunhos ficam fora das rotas, recursos e links públicos", async ({ page, request }) => {
  const files = await readdir("out", { recursive: true });
  expect(files.some(file => /(?:^|[\\/])(?:conteudos|workbench)(?:[\\/]|$)/.test(file))).toBe(false);
  for (const file of files.filter(file => /\.(html|txt|js|json|xml)$/.test(file))) {
    const content = await readFile(join("out", file), "utf8");
    for (const article of articles) {
      expect(content, file).not.toContain(article.slug);
      expect(content, file).not.toContain(article.sections[0].paragraphs[0]);
    }
  }
  for (const route of [...disabledRoutes, "/conteudos/index.html", "/conteudos/index.txt", "/workbench/editorial/", "/conteudos/artigo-inexistente/"]) {
    expect((await request.get(route)).status(), route).toBe(404);
  }
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('a[href*="/conteudos"]')).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Conteúdos", exact: true })).toHaveCount(0);
    await expect(page.locator(".knowledge-section, .editorial-note, .pending-label, .status-tag")).toHaveCount(0);
    expect(await page.locator("body").innerText()).not.toMatch(/a confirmar|em desenvolvimento|em preparação|em construção|revisão editorial|rascunho|retrato a ser adicionado/i);
    for (const action of await page.locator(".contact-invitation .button").all()) {
      expect(await action.getAttribute("href"), route).not.toBe(route);
    }
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  }
});

test("índice de leitura e perguntas frequentes funcionam por teclado", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/psicoterapia/");
  await page.getByRole("navigation", { name: "Nesta página" }).getByRole("link", { name: /Relação terapêutica/ }).click();
  await expect(page).toHaveURL(/#relacao$/);
  await expect(page.locator("#relacao-titulo")).toBeInViewport();
  const question = page.locator(".faq-list summary").first();
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".faq-list details").first()).toHaveAttribute("open", "");
  await expect(page.locator(".faq-list details").first().locator("p")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator(".faq-list details").first()).not.toHaveAttribute("open");
});

test("contato publica WhatsApp e e-mail profissional e rotas inexistentes retornam 404", async ({ page, request }) => {
  await page.goto("/contato/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Vamos conversar.");
  await expect(page.locator(".interior-intro")).toHaveText("Entre em contato para esclarecer dúvidas sobre os serviços, modalidades de atendimento e disponibilidade de horários.");
  await expect(page.locator(".contact-channel")).toHaveCount(2);
  await expect(page.locator(".contact-channel h3")).toHaveText(["WhatsApp", "E-mail"]);
  await expect(page.locator(".contact-channel .contact-value")).toHaveText(["(11) 94367-6864", "contato@psieduardotumani.com.br"]);
  const whatsapp = page.getByRole("link", { name: "Conversar pelo WhatsApp" });
  await expect(whatsapp).toHaveCount(1);
  await expect(whatsapp).toBeVisible();
  await expect(whatsapp).toHaveAttribute("href", "https://wa.me/5511943676864");
  await expect(page.locator('a[href*="wa.me"]')).toHaveCount(1);
  await whatsapp.focus();
  await expect(whatsapp).toBeFocused();
  expect(await whatsapp.evaluate(element => getComputedStyle(element).outlineStyle)).toBe("solid");
  await expect(page.locator('a[href^="mailto:"], form, input, textarea')).toHaveCount(0);
  await expect(page.locator("#atendimento")).toBeVisible();
  await expect(page.getByText("contato@psieduardotumani.com.br", { exact: true })).toBeVisible();
  await expect(page.getByText("Não há canais de contato disponíveis", { exact: false })).toHaveCount(0);
  const missing = await request.get("/conteudos/artigo-inexistente/");
  expect(missing.status()).toBe(404);
  await page.goto("/privacidade/");
  await expect(page.locator("#contato")).toBeVisible();
  await expect(page.locator("#contato")).toContainText("O link do WhatsApp abre um serviço externo.");
  await expect(page.locator("#contato")).toContainText("O site não incorpora o WhatsApp nem envia mensagens automaticamente.");
  await expect(page.locator("#contato")).toContainText("Essas informações são utilizadas para responder à solicitação");
  await expect(page.locator("#contato")).toContainText("O botão de e-mail");
  await expect(page.locator("#direitos")).toBeVisible();
  await expect(page.locator("#direitos a")).toHaveAttribute("href", "/contato/");
  await expect(page.getByText("O provedor pode manter registros técnicos", { exact: false })).toBeVisible();
});

test("canais exigem ativação explícita e geram destinos válidos", () => {
  expect(contact.whatsapp).toEqual({ enabled: true, number: "+5511943676864" });
  expect(getContactChannels()).toEqual([
    { kind: "whatsapp", title: "WhatsApp", value: "(11) 94367-6864", href: "https://wa.me/5511943676864", action: "Conversar pelo WhatsApp" },
  ]);
  expect(contact.email).toEqual({ enabled: true, address: "contato@psieduardotumani.com.br" });
  const configured: ContactInformation = {
    professionalChannel: null,
    whatsapp: { enabled: false, number: "+12025550123" },
    email: { enabled: false, address: "contato@example.com" },
  };
  expect(getContactChannels(configured)).toEqual([]);
  expect(getContactChannels({ ...configured, whatsapp: { ...configured.whatsapp, enabled: true } })).toEqual([
    { kind: "whatsapp", title: "WhatsApp", value: "+12025550123", href: "https://wa.me/12025550123", action: "Conversar pelo WhatsApp" },
  ]);
  expect(getContactChannels({ ...configured, email: { ...configured.email, enabled: true } })).toEqual([
    { kind: "email", title: "E-mail", value: "contato@example.com", href: "mailto:contato@example.com", action: "Enviar e-mail" },
  ]);
  expect(() => getContactChannels({ ...configured, whatsapp: { enabled: true, number: null } })).toThrow();
  expect(() => getContactChannels({ ...configured, whatsapp: { enabled: true, number: "(11) 00000-0000" } })).toThrow();
  expect(() => getContactChannels({ ...configured, email: { enabled: true, address: "contato@example.com?bcc=outro@example.com" } })).toThrow();
});

test("páginas mantêm chamadas de contato funcionais sem publicar e-mail ou formulários", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator(".header-contact")).toHaveText("Vamos conversar");
    await expect(page.locator(".header-contact")).toHaveAttribute("href", "/contato/");
    await expect(page.locator('a[href^="mailto:"], form, input, textarea')).toHaveCount(0);
    expect(await page.getByRole("main").innerText()).not.toContain("contato@psieduardotumani.com.br");
    await expect(page.getByText("Não há canais de contato disponíveis", { exact: false })).toHaveCount(0);
    for (const action of await page.locator(".contact-invitation .button").all()) {
      await expect(action).toHaveText("Ir para contato");
      await expect(action).toHaveAttribute("href", "/contato/");
    }
    for (const link of await page.locator('a[href*="wa.me"]').all()) {
      await expect(link).toHaveAttribute("href", "https://wa.me/5511943676864");
    }
  }
});

test("serviços mantêm públicos, modalidades e regiões consistentes entre as páginas", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('a.service-card[href="/psicoterapia/"]')).toContainText("Online · Adultos e idosos");
  await expect(page.locator('a.service-card[href="/avaliacao-psicologica/"]')).toContainText("Presencial · Crianças, adultos e idosos");
  await page.goto("/psicoterapia/");
  await expect(page.getByRole("note", { name: "Informações de atendimento" })).toHaveText("Atendimento online para adultos e idosos.");
  await page.goto("/avaliacao-psicologica/");
  await expect(page.getByRole("note", { name: "Informações de atendimento" })).toHaveText("Atendimento presencial para crianças, adultos e idosos, nas regiões de Santana e Cerqueira César (Avenida Paulista), em São Paulo/SP.");
  await page.goto("/contato/");
  await expect(page.locator("#atendimento")).toContainText("Online, para adultos e idosos.");
  await expect(page.locator("#atendimento")).toContainText("Presencial, para crianças, adultos e idosos.");
  await expect(page.locator("#atendimento")).toContainText("Regiões: Santana e Cerqueira César (Avenida Paulista), São Paulo/SP.");
  for (const width of [1440, 1280, 1024, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    const first = await page.locator("#modalidade-online").boundingBox();
    const second = await page.locator("#modalidade-presencial").boundingBox();
    expect(first).not.toBeNull();
    expect(second).not.toBeNull();
    if (width >= 768) {
      expect(second!.y).toBe(first!.y);
      expect(second!.x).toBeGreaterThan(first!.x);
    } else {
      expect(second!.x).toBe(first!.x);
      expect(second!.y).toBeGreaterThan(first!.y);
    }
  }
});

test("menu móvel funciona por teclado, fecha com Escape e navega", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.locator('button[aria-controls="mobile-navigation"]');
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const navigation = page.getByRole("navigation", { name: "Navegação principal móvel" });
  await expect(navigation).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(navigation.getByRole("link", { name: /Início/ })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(navigation).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
  await navigation.getByRole("link", { name: /Contato/ }).click();
  await expect(page).toHaveURL(/\/contato\//);
  await expect(navigation).toBeHidden();
  await expect(page.getByRole("heading", { name: "Canais profissionais", exact: true })).toBeVisible();
});

test("atalho de teclado permite pular a navegação", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Pular para o conteúdo" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
});

test("páginas se adaptam de 320 a 1440 pixels sem rolagem horizontal", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const overflows = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflows, `${route} com ${width}px`).toBe(false);
    }
  }
});

test("recursos locais, imagens válidas e ausência de rastreamento", async ({ page, context }) => {
  const errors: string[] = [];
  const origins = new Set<string>();
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => origins.add(new URL(request.url()).origin));
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const route of routes) {
    await page.goto(route);
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      await expect(image).toHaveAttribute("alt", /.+/);
      await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      expect(Number(await image.getAttribute("width"))).toBeGreaterThan(0);
      expect(Number(await image.getAttribute("height"))).toBeGreaterThan(0);
    }
  }
  expect(errors).toEqual([]);
  expect([...origins]).toEqual([new URL(page.url()).origin]);
  expect(await context.cookies()).toEqual([]);
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await page.goto("/contato/");
  await expect(page.locator("form, input, textarea")).toHaveCount(0);
});
