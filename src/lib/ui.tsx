import type { ReactNode } from "react";
import { Reveal } from "./motion";

/** Заголовок раздела в духе чертежной рамки: номер, линия-размер, кикер. */
export function SectionHead({
  index,
  kicker,
  title,
  note,
}: {
  index: string;
  kicker: string;
  title: string;
  note?: string;
}) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent-400">
        <span>{index}</span>
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-accent-500/60 via-line-soft to-transparent" />
        <span aria-hidden className="hidden h-3 w-px bg-accent-500/50 md:block" />
        <span className="hidden text-fog-500 md:block">лист {index}</span>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-fog-400">{kicker}</p>
          <h2 className="mt-2 font-display text-[1.65rem] leading-tight font-semibold tracking-tight text-paper sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
        </div>
        {note ? (
          <p className="max-w-sm text-sm leading-relaxed text-fog-400">{note}</p>
        ) : null}
      </div>
    </Reveal>
  );
}

/** Плашка «ДЕМО» — маркер контента, который Создатель заменит перед публикацией. */
export function DemoTag({ label = "демо" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-demo-400/40 bg-demo-400/10 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-demo-400">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-demo-400" />
      {label}
    </span>
  );
}

/** Обёртка карточки с рисками по углам — как поле чертежа. */
export function TickedCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`group/card relative ${className}`}>
      <span aria-hidden className="pointer-events-none absolute -left-px -top-px z-10 h-3.5 w-3.5 border-l border-t border-accent-400/70 transition-all duration-500 group-hover/card:h-5 group-hover/card:w-5" />
      <span aria-hidden className="pointer-events-none absolute -right-px -top-px z-10 h-3.5 w-3.5 border-r border-t border-accent-400/70 transition-all duration-500 group-hover/card:h-5 group-hover/card:w-5" />
      <span aria-hidden className="pointer-events-none absolute -bottom-px -left-px z-10 h-3.5 w-3.5 border-b border-l border-accent-400/70 transition-all duration-500 group-hover/card:h-5 group-hover/card:w-5" />
      <span aria-hidden className="pointer-events-none absolute -bottom-px -right-px z-10 h-3.5 w-3.5 border-b border-r border-accent-400/70 transition-all duration-500 group-hover/card:h-5 group-hover/card:w-5" />
      {children}
    </div>
  );
}

/** Моноширинная надпись-реквизит. */
export function Meta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[11px] uppercase tracking-[0.22em] text-fog-500 ${className}`}>
      {children}
    </span>
  );
}
