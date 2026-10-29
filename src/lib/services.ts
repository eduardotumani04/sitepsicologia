type ServiceDefinition = {
  title: string;
  href: string;
  modality: "Online" | "Presencial";
  audiences: readonly string[];
  approach?: string;
  location?: { regions: readonly string[]; city: string; state: string };
};

function joinItems(items: readonly string[]) {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} e ${items.at(-1)}`;
}

function defineService(definition: ServiceDefinition) {
  const audience = joinItems(definition.audiences);
  const location = definition.location;
  const regions = location ? joinItems(location.regions) : null;
  const city = location ? `${location.city}/${location.state}` : null;
  return {
    ...definition,
    summaryLabel: `${definition.modality} · ${audience.charAt(0).toUpperCase()}${audience.slice(1)}`,
    contactSummary: `${definition.modality}, para ${audience}.`,
    regionSummary: regions ? `Regiões: ${regions}, ${city}.` : null,
    practicalInformation: `Atendimento ${definition.modality.toLowerCase()} para ${audience}${regions ? `, nas regiões de ${regions}, em ${city}` : ""}.`,
  };
}

// Dados profissionais confirmados pelo responsável; não há endereço completo.
export const services = {
  psicoterapia: defineService({
    title: "Psicoterapia",
    href: "/psicoterapia/",
    modality: "Online",
    audiences: ["adultos", "idosos"],
    approach: "Terapia Analítico-Comportamental",
  }),
  avaliacaoPsicologica: defineService({
    title: "Avaliação Psicológica",
    href: "/avaliacao-psicologica/",
    modality: "Presencial",
    audiences: ["crianças", "adultos", "idosos"],
    location: {
      regions: ["Santana", "Cerqueira César (Avenida Paulista)"],
      city: "São Paulo",
      state: "SP",
    },
  }),
};
