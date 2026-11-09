import { ArrowUp, Crosshair } from "lucide-react";
import { NAV } from "./Header";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center border border-line bg-ink-900 text-accent-400">
                <Crosshair className="h-4.5 w-4.5" strokeWidth={1.5} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[13px] font-semibold tracking-wide text-paper">СПЕЦИАЛИСТ</span>
                <span className="mt-1 font-mono text-[10px] tracking-[0.34em] text-fog-400">НА ЧАС</span>
              </span>
            </a>
            <p className="mt-5 text-sm leading-relaxed text-fog-400">
              Цифровая мастерская: чертежи и 3D, сметы и документы, сайты и автоматизация, фото и
              видео. Удалённо — везде, выезд — по Санкт-Петербургу, по договорённости.
            </p>
          </div>

          <nav aria-label="Навигация в подвале">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog-500">Разделы</p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-sm text-fog-300 transition-colors hover:text-accent-300">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-w-xs">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog-500">На связи</p>
            <p className="mt-4 text-sm leading-relaxed text-fog-400">
              Контактные данные будут добавлены позднее.
            </p>
            <a
              href="#top"
              className="footer-back-to-top mt-6 inline-flex items-center gap-2 border border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-fog-300 transition-colors hover:border-accent-400/60 hover:text-accent-300"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Наверх
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line-soft pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-fog-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} · Специалист на час</p>
          <p>Вычерчено в цифровой мастерской · лист 1 из 1</p>
        </div>
      </div>
      <div className="border-t border-line-soft px-3 pt-5 sm:px-6">
        <svg
          viewBox="0 0 1200 112"
          role="img"
          aria-label="Специалист на час"
          className="block h-auto w-full overflow-visible text-paper"
        >
          <text x="0" y="91" textLength="1200" lengthAdjust="spacingAndGlyphs" fill="none" stroke="#ffffff" strokeWidth="1.5" className="font-display" fontSize="100" fontWeight="700" xmlSpace="preserve">
            {Array.from("СПЕЦИАЛИСТ НА ЧАС").map((letter, index) => (
              <tspan key={index} className="footer-flip-letter" style={{ animationDelay: `${index * 0.12}s` }}>{letter}</tspan>
            ))}
          </text>
        </svg>
        <div className="flex flex-col items-center gap-3 border-t border-line-soft py-5 text-center text-sm text-fog-300">
          <p>Сайт создан «Специалистом на час» — от идеи и разработки до запуска.</p>
          <a href="https://annakam.ru/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 transition-colors hover:text-accent-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400">
            <svg viewBox="0 0 100 100" className="h-10 w-10 shrink-0" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="ak-footer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ff88" />
                  <stop offset="50%" stopColor="#00ccff" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
              <path d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z" stroke="url(#ak-footer-gradient)" strokeWidth="1.5" />
              <path d="M10 27.5 L50 50 L90 27.5 M50 50 V95" stroke="url(#ak-footer-gradient)" strokeWidth="1.5" opacity=".7" />
              <text x="50" y="58" textAnchor="middle" fill="url(#ak-footer-gradient)" fontSize="24" fontFamily="monospace" fontWeight="bold">AK</text>
              <circle cx="50" cy="5" r="2" fill="#00ff88" />
              <circle cx="90" cy="27.5" r="1.5" fill="#00ccff" />
              <circle cx="10" cy="72.5" r="1.5" fill="#c084fc" />
            </svg>
            <span>Другие наши проекты — annakam.ru</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
