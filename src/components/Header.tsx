import { useEffect, useRef, useState } from "react";
import { Menu, X, Crosshair, Zap, ZapOff, ArrowUpRight } from "lucide-react";
import { useMotion } from "../lib/motion";

export const NAV = [
  { id: "услуги", label: "Услуги" },
  { id: "работы", label: "Работы" },
  { id: "обо-мне", label: "Обо мне" },
  { id: "контакты", label: "Контакты" },
];

export default function Header() {
  const { reduced, toggle } = useMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  /* прогресс прокрутки + тень шапки */
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* подсветка активного раздела */
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* Escape закрывает меню, фокус возвращается на кнопку */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled ? "border-line bg-ink-950/85 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
    >
      {/* линия прогресса */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-accent-500 via-accent-400 to-accent-300"
        style={{ transform: `scaleX(${progress})` }}
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Специалист на час — наверх">
          <span className="relative grid h-9 w-9 place-items-center border border-line bg-ink-900 text-accent-400 transition-colors group-hover:border-accent-400/60">
            <Crosshair className="h-4.5 w-4.5" strokeWidth={1.5} />
            <span aria-hidden className="absolute -right-px -top-px h-1.5 w-1.5 border-r border-t border-accent-400" />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-[13px] font-semibold tracking-wide text-paper">СПЕЦИАЛИСТ</span>
            <span className="mt-1 font-mono text-[10px] tracking-[0.34em] text-fog-400">НА ЧАС</span>
          </span>
        </a>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={`relative px-4 py-2 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors ${
                    active === n.id ? "text-accent-400" : "text-fog-400 hover:text-paper"
                  }`}
                  aria-current={active === n.id ? "true" : undefined}
                >
                  {n.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-4 -bottom-0.5 h-px bg-accent-400 transition-transform duration-300 ${
                      active === n.id ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-pressed={reduced}
            title={reduced ? "Анимация уменьшена — включить полную" : "Уменьшить анимацию"}
            className="inline-flex items-center gap-2 border border-line bg-ink-900/60 px-2.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-fog-400 transition-colors hover:border-accent-400/50 hover:text-accent-300 sm:px-3"
          >
            {reduced ? <ZapOff className="h-3.5 w-3.5" /> : <Zap className="h-3.5 w-3.5" />}
            <span className="hidden md:inline">{reduced ? "Без анимации" : "Анимация"}</span>
          </button>

          <a
            href="#контакты"
            className="group hidden items-center gap-2 bg-accent-500 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-950 transition-colors hover:bg-accent-300 sm:inline-flex"
          >
            Обсудить задачу
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            ref={burgerRef}
            type="button"
            className="grid h-10 w-10 place-items-center border border-line bg-ink-900/60 text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* мобильное меню */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-x-0 top-16 origin-top border-b border-line bg-ink-950/97 backdrop-blur-xl transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <nav aria-label="Мобильная навигация">
            <ul className="divide-y divide-line-soft px-4 sm:px-6">
              {NAV.map((n, i) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className="flex items-center justify-between py-4 font-display text-lg text-paper"
                  >
                    <span>{n.label}</span>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-fog-500">0{i + 1}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#контакты"
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="my-4 flex items-center justify-center gap-2 bg-accent-500 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-950"
                >
                  Обсудить задачу
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
