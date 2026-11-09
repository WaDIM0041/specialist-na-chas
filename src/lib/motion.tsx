import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/*  Контекст управления анимацией.                                     */
/*  Учитывает системный prefers-reduced-motion и ручной переключатель. */
/* ------------------------------------------------------------------ */

type MotionContextValue = {
  reduced: boolean;
  toggle: () => void;
};

const MotionContext = createContext<MotionContextValue>({
  reduced: false,
  toggle: () => {},
});

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("reduced-motion", reduced);
    root.classList.toggle("motion-on", !reduced);
  }, [reduced]);

  const toggle = useCallback(() => setReduced((v) => !v), []);

  return (
    <MotionContext.Provider value={{ reduced, toggle }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}

/* ------------------------------------------------------------------ */
/*  Reveal — плавное появление блока при входе в область видимости.    */
/* ------------------------------------------------------------------ */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "span";
};

export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
