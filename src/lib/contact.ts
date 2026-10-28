export type ContactInformation = {
  professionalChannel: { enabled: boolean; label: string; url: `https://${string}` } | null;
  whatsapp: { enabled: boolean; number: string | null };
  email: { enabled: boolean; address: string | null };
};

// Ativar somente após confirmação e teste do canal pelo responsável.
// WhatsApp: formato internacional com +, código do país e número, sem espaços.
export const contact: ContactInformation = {
  professionalChannel: null,
  whatsapp: { enabled: false, number: null },
  email: { enabled: false, address: "contato@psieduardotumani.com.br" },
};

export function whatsappHref(number: string | null): string | null {
  if (!number) return null;
  if (!/^\+[1-9]\d{7,14}$/.test(number)) {
    throw new Error("O WhatsApp precisa estar no formato internacional: +, código do país e número, sem espaços.");
  }
  return `https://wa.me/${number.slice(1)}`;
}

export type ContactChannel = {
  kind: "professional" | "whatsapp" | "email";
  title: string;
  value: string;
  href: string;
  action: string;
};

export function getContactChannels(configuration: ContactInformation = contact): ContactChannel[] {
  const channels: ContactChannel[] = [];
  const professional = configuration.professionalChannel;
  if (professional?.enabled) {
    const url = new URL(professional.url);
    if (url.protocol !== "https:" || url.username || url.password || !professional.label.trim()) {
      throw new Error("O canal profissional precisa de um rótulo e uma URL HTTPS válida, sem credenciais.");
    }
    channels.push({ kind: "professional", title: "Canal profissional", value: professional.label, href: url.href, action: "Acessar canal profissional" });
  }
  if (configuration.whatsapp.enabled) {
    const href = whatsappHref(configuration.whatsapp.number);
    if (!href) throw new Error("Informe o número profissional antes de ativar o WhatsApp.");
    channels.push({ kind: "whatsapp", title: "WhatsApp", value: configuration.whatsapp.number!, href, action: "Conversar pelo WhatsApp" });
  }
  if (configuration.email.enabled) {
    const address = configuration.email.address;
    if (!address || !/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(address)) {
      throw new Error("Informe um endereço profissional de e-mail válido antes de ativar o canal.");
    }
    channels.push({ kind: "email", title: "E-mail", value: address, href: `mailto:${address}`, action: "Enviar e-mail" });
  }
  return channels;
}

export const contactChannels = getContactChannels();
export const hasContactChannel = contactChannels.length > 0;
