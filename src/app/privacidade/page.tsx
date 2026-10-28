import type { Metadata } from "next";
import Link from "next/link";
import { InteriorPage } from "@/components/interior-page";

export const metadata: Metadata = { title: "Política de Privacidade", description: "Informações sobre privacidade, navegação e tratamento de dados nesta versão do site de Eduardo Villela Tumani." };

export default function PrivacyPage() {
  return (
    <InteriorPage eyebrow="Privacidade" title="Respeito também é cuidado." intro="Esta política descreve o funcionamento da versão inicial do site de Eduardo Villela Tumani, psicólogo — CRP 06/127526.">
      <h2>O que este site coleta</h2>
      <p>Esta versão é informativa. Não há cadastro, autenticação, formulário de contato, pagamentos ou coleta de informações clínicas pela aplicação.</p>
      <h2>Cookies e rastreamento</h2>
      <p>O site não implementa ferramentas de análise de audiência, rastreadores de publicidade ou cookies de marketing. Não utiliza armazenamento local para criar perfis de visitantes.</p>
      <h2>Fontes e imagens</h2>
      <p>As fontes tipográficas e as imagens são servidas junto aos arquivos do próprio site. Não há carregamento de fontes por serviços externos, vídeos incorporados ou ferramentas de terceiros nesta versão.</p>
      <h2>Dados técnicos da hospedagem</h2>
      <p>O provedor de hospedagem pode processar dados técnicos de acesso, como endereço IP, horário da requisição e informações do navegador, para entregar as páginas e manter a segurança da infraestrutura. Os detalhes dependerão da configuração do serviço utilizado na publicação.</p>
      <h2>Contato e direitos sobre dados</h2>
      <p>O canal profissional para questões relacionadas à privacidade será informado na <Link href="/contato/">página de contato</Link>. Esse canal ainda está em preparação. Não envie dados pessoais ou informações de saúde por espaços públicos.</p>
      <h2>Atualizações desta política</h2>
      <p>Esta política deverá ser revisada quando os canais de contato forem disponibilizados ou se novas funcionalidades alterarem o tratamento de dados. Recursos de terceiros deverão ser avaliados antes de sua inclusão.</p>
    </InteriorPage>
  );
}
