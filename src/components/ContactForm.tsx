import { SectionHead } from "../lib/ui";
import { Reveal } from "../lib/motion";

const channels = ["MAX", "Telegram", "ВКонтакте", "Телефон", "Электронная почта"];

export default function ContactForm() {
  return (
    <section id="контакты" className="scroll-mt-20 border-t border-line-soft bg-ink-900/30 py-20 md:py-28" aria-labelledby="contacts-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead index="04" kicker="Контакты" title="Обсудить задачу" note="Контактные данные появятся здесь позже." />
        <Reveal>
          <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
            {channels.map((channel) => (
              <li key={channel} className="flex items-center justify-between gap-4 border border-line bg-ink-950 px-5 py-4">
                <span className="font-semibold text-paper">{channel}</span>
                <span className="text-sm text-fog-400">Скоро появится</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-fog-300">Удалённо — из любого города. Выезд — Санкт-Петербург, по договорённости.</p>
        </Reveal>
      </div>
    </section>
  );
}
