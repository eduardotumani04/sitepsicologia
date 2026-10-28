import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { InteriorPage } from "@/components/interior-page";
import { contactChannels, hasContactChannel } from "@/lib/contact";

export const metadata = pageMetadata({
  title: "Política de Privacidade",
  description: "Conheça como funciona a navegação no site profissional de Eduardo Villela Tumani e quais recursos são utilizados nas páginas.",
  path: "/privacidade/",
  indexable: false,
});

export default function PrivacyPage() {
  return (
    <InteriorPage
      eyebrow="Política de Privacidade"
      title="Respeito também é cuidado."
      intro="Informações sobre o funcionamento do site profissional de Eduardo Villela Tumani, psicólogo — CRP 06/127526, e os recursos utilizados durante a navegação."
      sections={[
        { id: "escopo", title: "Sobre este site" },
        { id: "navegacao", title: "Navegação e recursos" },
        { id: "dados", title: "Dados e rastreamento" },
        { id: "hospedagem", title: "Infraestrutura" },
        ...(hasContactChannel ? [{ id: "contato", title: "Canais de contato" }] : []),
        ...(hasContactChannel ? [{ id: "direitos", title: "Questões de privacidade" }] : []),
      ]}
    >
      <section className="reading-section" id="escopo" aria-labelledby="escopo-titulo">
        <h2 id="escopo-titulo">Sobre este site</h2>
        <p>Este site apresenta informações profissionais e explica a Psicoterapia e a Avaliação Psicológica. As páginas são geradas como arquivos estáticos. Não há cadastro, autenticação, pagamento, agendamento ou formulário de envio de mensagens.</p>
      </section>
      <section className="reading-section" id="navegacao" aria-labelledby="navegacao-titulo">
        <h2 id="navegacao-titulo">Recursos necessários à navegação</h2>
        <p>O navegador faz requisições para receber as páginas, os estilos, os scripts de navegação, as imagens e os arquivos de fonte. Ao abrir um link interno, solicita os arquivos necessários à página escolhida.</p>
        <p>As imagens e a fonte Manrope são entregues pelo próprio site. A visita não provoca requisições ao Google Fonts ou a outros provedores de fontes. Não há vídeos, mapas ou serviços de terceiros incorporados nas páginas.</p>
      </section>
      <section className="reading-section" id="dados" aria-labelledby="dados-titulo">
        <h2 id="dados-titulo">Informações pessoais, cookies e rastreamento</h2>
        <p>A aplicação não possui campos para coletar informações pessoais ou clínicas. Não implementa análise de audiência, publicidade, cookies de marketing ou armazenamento local para identificar ou criar perfis de visitantes.</p>
        <p>Não é necessário fornecer dados de saúde, documentos ou relatos pessoais para ler as páginas.</p>
      </section>
      <section className="reading-section" id="hospedagem" aria-labelledby="hospedagem-titulo">
        <h2 id="hospedagem-titulo">Infraestrutura de navegação</h2>
        <p>A entrega das páginas depende da infraestrutura de hospedagem. Como parte da conexão, essa infraestrutura recebe informações técnicas da requisição, como o endereço IP e o recurso solicitado.</p>
        <p>O provedor pode manter registros técnicos de acesso e segurança, que também podem incluir data e hora, informações do navegador e ocorrências de erro. A existência de registros e suas condições de acesso e retenção dependem da configuração e das políticas do serviço de hospedagem.</p>
        <p>A aplicação não utiliza essas informações para criar perfis, enviar publicidade ou realizar avaliações psicológicas. O site não possui banco de dados de visitantes ou de pacientes.</p>
      </section>
      {hasContactChannel && (
        <section className="reading-section" id="contato" aria-labelledby="contato-titulo">
          <h2 id="contato-titulo">Contato por canais profissionais</h2>
          <p>Ao iniciar uma conversa por um canal divulgado no site, você compartilha as informações da mensagem e os dados de identificação associados ao canal, como nome, número de telefone ou endereço de e-mail. Essas informações são utilizadas para responder à solicitação e tratar assuntos profissionais ou administrativos.</p>
          {contactChannels.some(channel => channel.kind === "whatsapp") && <p>O link do WhatsApp abre um serviço externo. O envio e a entrega das mensagens dependem desse serviço e de suas próprias condições de privacidade. O site não incorpora o WhatsApp nem envia mensagens automaticamente.</p>}
          {contactChannels.some(channel => channel.kind === "email") && <p>O botão de e-mail abre o aplicativo de correio escolhido por você. A mensagem é processada pelos serviços de e-mail envolvidos no envio e no recebimento, fora desta aplicação.</p>}
          {contactChannels.some(channel => channel.kind === "professional") && <p>O canal profissional externo possui suas próprias condições de funcionamento e privacidade, que devem ser consultadas ao acessá-lo.</p>}
          <p>Use o primeiro contato para informações gerais. Evite enviar relatos clínicos detalhados, documentos ou resultados de testes. Não há formulário neste site, e uma mensagem inicial não constitui atendimento psicológico.</p>
        </section>
      )}
      {hasContactChannel && (
        <section className="reading-section" id="direitos" aria-labelledby="direitos-titulo">
          <h2 id="direitos-titulo">Questões de privacidade</h2>
          <p>Para assuntos relacionados à privacidade, utilize um dos canais profissionais divulgados na <Link prefetch={false} href="/contato/">página de contato</Link>. O site não recebe solicitações por formulário.</p>
        </section>
      )}
    </InteriorPage>
  );
}
