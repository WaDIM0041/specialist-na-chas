import { ArrowRight, ArrowDown, MapPin, Globe2, Clock, ShieldCheck } from "lucide-react";
import BlueprintScene from "./BlueprintScene";
import { Reveal, useMotion } from "../lib/motion";

const TICKER = [
  "Чертежи",
  "3D-визуализация",
  "Сметы",
  "Документы",
  "Сайты",
  "Автоматизация",
  "Фото",
  "Видео",
  "Поздравления",
  "Выезд по СПб",
];

export default function Hero() {
  const { reduced } = useMotion();
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* фон: миллиметровка и свечение */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(125,185,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(125,185,255,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 90% 70% at 60% 20%, black 30%, transparent 100%)",
          }}
        />
        <div className="absolute -top-40 right-[8%] h-[480px] w-[480px] rounded-full bg-accent-500/10 blur-[130px]" />
        <div className="absolute bottom-0 left-[-10%] h-[320px] w-[420px] rounded-full bg-accent-600/8 blur-[110px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 lg:pb-20 lg:pt-24">
        {/* ---- текст ---- */}
        <div className="relative">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-400">
              <span className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full bg-accent-400 ${reduced ? "" : "animate-blink"}`} />
                Цифровая мастерская
              </span>
              <span aria-hidden className="h-px w-10 bg-line" />
              <span className="text-fog-400">Санкт-Петербург · онлайн — весь мир</span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[2.5rem] font-bold leading-[1.02] tracking-tight text-paper sm:text-6xl xl:text-[4.6rem]">
              Специалист
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(87,214,255,0.85)" }}
              >
                на час
              </span>
            </h1>
          </Reveal>

          <div className="portfolio-cube" aria-hidden="true">
            <span className="portfolio-cube-form">
              <i /><i /><i /><i /><i /><i /><span className="portfolio-cube-core" />
            </span>
          </div>

          <Reveal delay={170}>
            <p className="mt-5 max-w-xl text-lg font-semibold text-fog-300 sm:text-xl">
              Разовые задачи и регулярная помощь удалённо
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-fog-400 sm:text-base">
              Начерчу план по эскизу, подготовлю 3D-визуализацию, сверю смету, оформлю документы,
              доработаю сайт или соберу видеопоздравление.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#контакты"
                className="group inline-flex items-center justify-center gap-3 bg-accent-500 px-7 py-4 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-950 shadow-glow transition-colors hover:bg-accent-300"
              >
                Обсудить задачу
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#работы"
                className="group inline-flex items-center justify-center gap-3 border border-line bg-ink-900/50 px-7 py-4 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:border-accent-400/60 hover:text-accent-300"
              >
                Посмотреть работы
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={330}>
            <p className="mt-7 flex items-start gap-2.5 text-sm text-fog-300">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-demo-400" />
              <span>
                Выезд по Санкт-Петербургу — <span className="text-paper">по договорённости</span>
              </span>
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-line-soft pt-5">
              {[
                { icon: Globe2, t: "Удалённо — любой часовой пояс" },
                { icon: Clock, t: "Разовые задачи и регулярная помощь" },
                { icon: ShieldCheck, t: "Смета и срок — до старта работ" },
              ].map(({ icon: Icon, t }) => (
                <li key={t} className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fog-500">
                  <Icon className="h-3.5 w-3.5 text-accent-400" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ---- сцена ---- */}
        <Reveal delay={200} className="relative">
          <div className="relative border border-line bg-ink-900/70 shadow-glow backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-line" />
                <span className="h-2 w-2 rounded-full bg-line" />
                <span className="h-2 w-2 rounded-full bg-accent-500/70" />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog-500">
                Лист П-1 · от задачи к готовой работе
              </p>
            </div>
            <div className="p-3 sm:p-5">
              <BlueprintScene />
            </div>
          </div>
          <span aria-hidden className="absolute -right-px -top-px h-6 w-6 border-r-2 border-t-2 border-accent-400" />
          <span aria-hidden className="absolute -bottom-px -left-px h-6 w-6 border-b-2 border-l-2 border-accent-400" />
        </Reveal>
      </div>

      {/* бегущая строка */}
      <div className="relative border-y border-line bg-ink-900/60">
        <div className="overflow-hidden py-3.5" aria-hidden>
          <div className={`flex w-max gap-0 ${reduced ? "" : "animate-marquee"} motion-reduce:animate-none`}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="flex items-center whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.28em] text-fog-400">
                <span className="px-6">{t}</span>
                <span className="text-accent-500">+</span>
              </span>
            ))}
          </div>
        </div>
        <span className="sr-only">{TICKER.join(", ")}</span>
      </div>
    </section>
  );
}
