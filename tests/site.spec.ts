import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const articleRoutes = ["/conteudos/comportamento-e-contexto/", "/conteudos/conhecer-a-psicoterapia/"];
const routes = ["/", "/sobre/", "/psicoterapia/", "/avaliacao-psicologica/", "/conteudos/", "/contato/", "/privacidade/", ...articleRoutes];

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

test("rascunhos têm status, data de criação e leitura completa sem indexação", async ({ page }) => {
  await page.goto("/conteudos/");
  await expect(page.locator(".article-card")).toHaveCount(2);
  await expect(page.getByText("Ainda não há artigos definitivos publicados.", { exact: false })).toBeVisible();
  await expect(page.locator(".article-card time")).toHaveCount(2);
  const href = await page.locator(".article-card").first().getAttribute("href");
  await page.locator(".article-card").first().click();
  await expect(page).toHaveURL(new RegExp(`${href}$`));
  await expect(page.getByRole("complementary", { name: "Rascunho editorial — não aprovado para publicação" })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator(".article-byline")).toContainText("Rascunho criado em");
  await expect(page.locator(".article-byline")).not.toContainText("Publicado em");
  await expect(page.getByRole("navigation", { name: "Navegação principal", exact: true }).getByRole("link", { name: "Conteúdos", exact: true })).toHaveAttribute("aria-current", "page");
  await page.getByRole("link", { name: "Voltar aos conteúdos", exact: true }).click();
  await expect(page).toHaveURL(/\/conteudos\/$/);
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

test("contato não publica canais não confirmados e rotas inexistentes retornam 404", async ({ page, request }) => {
  await page.goto("/contato/");
  await expect(page.locator(".contact-channel")).toHaveCount(3);
  await expect(page.locator(".contact-channel a")).toHaveCount(0);
  await expect(page.locator('a[href^="mailto:"], a[href*="wa.me"], form, input, textarea')).toHaveCount(0);
  await expect(page.locator(".contact-modality")).toContainText("confirmar");
  const missing = await request.get("/conteudos/artigo-inexistente/");
  expect(missing.status()).toBe(404);
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
  await expect(page.getByText("Canais em preparação", { exact: true })).toBeVisible();
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
  for (const width of [320, 390, 768, 1024, 1440]) {
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
  const image = page.getByRole("img");
  await expect(image).toBeVisible();
  expect(await image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  expect(errors).toEqual([]);
  expect([...origins]).toEqual(["http://127.0.0.1:4173"]);
  expect(await context.cookies()).toEqual([]);
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await page.goto("/contato/");
  await expect(page.locator("form, input, textarea")).toHaveCount(0);
});
