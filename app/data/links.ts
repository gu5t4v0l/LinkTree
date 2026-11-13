// Todos os links e contatos da página ficam aqui.

export const WHATSAPP_NUMBER = "5511986977947";
export const WHATSAPP_DISPLAY = "(11) 98697-7947";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const CONTACT_EMAIL = "contato@limaware.com.br";

export const SITE_URL = "https://limaware.vercel.app";
export const SITE_LABEL = "limaware.vercel.app";
export const SHOPEE_GROUP_URL =
  "https://chat.whatsapp.com/KbgRDW94yxYKJC2UCSNiJc?mode=ems_share_t";

export const QUOTE_SERVICES = [
  "Site institucional",
  "Aplicativo",
  "Sistema sob medida",
  "Ainda não sei",
] as const;

export type QuoteService = (typeof QUOTE_SERVICES)[number];

export const QUOTE_BUDGETS = [
  "Até R$ 3 mil",
  "R$ 3–10 mil",
  "Acima de R$ 10 mil",
  "Ainda não sei",
] as const;

export type QuoteBudget = (typeof QUOTE_BUDGETS)[number];

export const QUOTE_BUDGET_DEFAULT: QuoteBudget = "Ainda não sei";

export type QuoteData = {
  name: string;
  company: string;
  service: QuoteService;
  budget: QuoteBudget;
};

/** Mesma mensagem usada no formulário do site. */
export function buildQuoteUrl({ name, company, service, budget }: QuoteData) {
  const text =
    `Olá! Sou ${name.trim() || "[nome]"}` +
    (company.trim() ? ` da ${company.trim()}` : "") +
    `. Quero um orçamento para: ${service}.` +
    ` Faixa de orçamento: ${budget === QUOTE_BUDGET_DEFAULT ? "a definir" : budget}.`;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

export type LinkItem = {
  id: string;
  title: string;
  description?: string;
  icon: string; // classe Remix Icon
  href: string;
  meta: string; // detalhe em mono
  /** Estado do serviço, exibido após o meta ("grupo no WhatsApp · em teste"). */
  status?: "em teste";
  /** Link secundário: linha compacta, sem descrição, sob o rótulo "Extra". */
  extra?: boolean;
};

export const LINKS: LinkItem[] = [
  {
    id: "site",
    title: "Conhecer a Limaware",
    description: "Projetos, serviços e como trabalhamos.",
    icon: "ri-global-line",
    href: SITE_URL,
    meta: SITE_LABEL,
  },
  // Reativar quando o grupo estiver aberto (grupo não aceita entrada):
  // {
  //   id: "shopee",
  //   title: "Ofertas da Shopee",
  //   icon: "ri-shopping-bag-3-line",
  //   href: SHOPEE_GROUP_URL,
  //   meta: "grupo no WhatsApp",
  //   status: "em teste",
  //   extra: true,
  // },
];
