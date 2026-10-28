import type { Metadata } from "next";
import Link from "next/link";
import { InteriorPage } from "@/components/interior-page";
import { EditorialNote } from "@/components/editorial-note";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Estrutura inicial para revisão da Política de Privacidade, baseada nas funcionalidades efetivamente implementadas no site de Eduardo Villela Tumani.",
  robots: { index: false, follow: true },
};

const sections = [
  { id: "escopo", title: "Escopo desta versão" },
  { id: "navegacao", title: "Navegação e recursos" },
  { id: "dados", title: "Dados e rastreamento" },
  { id: "hospedagem", title: "Hospedagem" },
  { id: "direitos", title: "Contato e direitos" },
  { id: "revisao", title: "Antes da publicação" },
];

export default function PrivacyPage() {
  return (
    <InteriorPage
      eyebrow="Privacidade · versão para revisão"
      title="Respeito também é cuidado."
      intro="Esta estrutura inicial descreve o funcionamento implementado no site profissional de Eduardo Villela Tumani, psicólogo — CRP 06/127526. As informações pendentes estão identificadas para revisão antes da publicação."
      sections={sections}
    >
      <EditorialNote title="Documento em revisão"><p>Esta política ainda precisa ser revisada pelo responsável, especialmente quanto à identificação de quem responde pelo tratamento de dados, ao canal para solicitações e à configuração real da hospedagem.</p></EditorialNote>
      <section className="reading-section" id="escopo" aria-labelledby="escopo-titulo">
        <h2 id="escopo-titulo">O que esta versão do site faz</h2>
        <p>O site apresenta informações profissionais, explica áreas de atuação e oferece uma área de leitura de conteúdos. As páginas são geradas como arquivos estáticos. Não há cadastro, autenticação, pagamento, agendamento ou formulário de envio de mensagens implementados nesta versão.</p>
        <p>Os canais profissionais ainda não foram preenchidos. Portanto, a página de contato não oferece links de WhatsApp, e-mail ou outros serviços de comunicação neste momento.</p>
      </section>
      <section className="reading-section" id="navegacao" aria-labelledby="navegacao-titulo">
        <h2 id="navegacao-titulo">Recursos necessários à navegação</h2>
        <p>O navegador faz requisições para receber as páginas, os estilos, os scripts de navegação, as imagens e os arquivos de fonte. A navegação pode antecipar o carregamento de páginas internas para facilitar a transição entre elas.</p>
        <p>As imagens e as fontes são entregues junto aos arquivos do próprio site. A Manrope é obtida pelo processo de build e não por uma requisição do navegador do visitante ao Google Fonts.</p>
        <p>Não há vídeos, mapas, botões de redes sociais incorporados ou outros serviços de terceiros embutidos nas páginas desta versão.</p>
      </section>
      <section className="reading-section" id="dados" aria-labelledby="dados-titulo">
        <h2 id="dados-titulo">Informações pessoais, cookies e rastreamento</h2>
        <p>A aplicação não possui campos para coletar informações pessoais ou clínicas. Também não implementa ferramentas de análise de audiência, publicidade, cookies de marketing ou armazenamento local para identificar ou criar perfis de visitantes.</p>
        <p>O conteúdo é informativo. Não é necessário fornecer dados de saúde, documentos ou relatos pessoais para ler as páginas e os artigos.</p>
      </section>
      <section className="reading-section" id="hospedagem" aria-labelledby="hospedagem-titulo">
        <h2 id="hospedagem-titulo">Configuração de hospedagem a confirmar</h2>
        <p>A entrega dos arquivos depende da infraestrutura utilizada na publicação. O registro de dados técnicos, as medidas de segurança e eventuais recursos de proteção dependem da configuração efetivamente adotada pelo provedor.</p>
        <p>Esses tratamentos ainda não foram descritos como operações já implementadas pela aplicação. Antes da publicação, o responsável precisa confirmar se haverá registros de acesso, quais dados serão utilizados, para quais finalidades, por quanto tempo e sob quais condições.</p>
        <EditorialNote><p>Confirmar provedor, configurações de registros e segurança, eventuais operadores, locais de processamento e informações aplicáveis sobre compartilhamento ou transferência de dados. Não foram presumidos prazos de retenção nem bases legais.</p></EditorialNote>
      </section>
      <section className="reading-section" id="direitos" aria-labelledby="direitos-titulo">
        <h2 id="direitos-titulo">Contato para questões de privacidade</h2>
        <p>O canal destinado a dúvidas e solicitações relacionadas a dados pessoais ainda precisa ser definido e informado na <Link href="/contato/">página de contato</Link>. Esta versão não recebe solicitações por formulário.</p>
        <p>O responsável deverá esclarecer como receber e responder às solicitações aplicáveis ao tratamento efetivamente realizado. Não envie informações pessoais ou de saúde em espaços públicos para tentar entrar em contato.</p>
      </section>
      <section className="reading-section" id="revisao" aria-labelledby="revisao-titulo">
        <h2 id="revisao-titulo">O que precisa ser concluído antes da publicação</h2>
        <ul className="information-list">
          <li>Confirmar a identificação e as responsabilidades relacionadas ao tratamento de dados.</li>
          <li>Definir um canal profissional para questões de privacidade e o procedimento de resposta.</li>
          <li>Verificar a configuração real de hospedagem e descrever somente os tratamentos aplicáveis.</li>
          <li>Revisar esta política sempre que forem incluídos canais, formulários ou recursos de terceiros.</li>
          <li>Definir a data e a identificação da versão aprovada da política.</li>
        </ul>
        <p>Novas funcionalidades precisam ser avaliadas antes de sua disponibilização. Esta estrutura não deve ser tratada como uma política definitiva sem a revisão das informações pendentes.</p>
      </section>
    </InteriorPage>
  );
}
