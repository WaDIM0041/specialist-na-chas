type PublicContact = {
  channel: "MAX" | "Telegram" | "ВКонтакте" | "Телефон" | "Почта";
  value: string;
  href?: string;
};

const phone = "+7 999 066 8884";

export const publicContacts: readonly PublicContact[] = [
  { channel: "Телефон", value: phone, href: "tel:+79990668884" },
  { channel: "MAX", value: `По номеру ${phone}` },
  { channel: "Telegram", value: "@Wadim_8884", href: "https://t.me/Wadim_8884" },
  { channel: "ВКонтакте", value: "vadikompany", href: "https://vk.ru/vadikompany" },
];
