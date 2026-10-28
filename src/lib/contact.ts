type ContactInformation = {
  professionalChannel: { label: string; url: `https://${string}` } | null;
  whatsapp: string | null;
  email: string | null;
  modality: string | null;
};

// Preencher apenas com informações confirmadas pelo responsável.
// WhatsApp: formato internacional, começando por + e código do país.
export const contact: ContactInformation = {
  professionalChannel: null,
  whatsapp: null,
  email: null,
  modality: null,
};

export function whatsappHref(number: string | null): string | null {
  if (!number) return null;
  if (!/^\+[1-9]\d{7,14}$/.test(number)) {
    throw new Error("O WhatsApp precisa estar no formato internacional: +, código do país e número, sem espaços.");
  }
  return `https://wa.me/${number.slice(1)}`;
}
