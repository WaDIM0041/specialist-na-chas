import { useEffect, useState } from "react";
import { useMotion } from "../lib/motion";

/* ------------------------------------------------------------------ */
/*  BlueprintScene — фирменный приём сайта.                            */
/*  Карандашный эскиз собирается в точный чертёж в рамке А1,           */
/*  затем лист «наклоняется», и стены поднимаются в объёмную модель.   */
/* ------------------------------------------------------------------ */

const DUR = [3200, 3200, 4400, 700]; // длительности стадий: эскиз, чертёж, модель, затухание
const FLAT = "translate(148px, 88px)";
const ISO = "matrix(0.5889 0.34 -0.5889 0.34 262 78)";

const S = 0.68;
const WH = 52; // высота стен в экранных единицах
const isoX = (x: number, y: number) => (x - y) * 0.866 * S + 262;
const isoY = (x: number, y: number) => (x + y) * 0.5 * S + 78;
const P = (x: number, y: number, h = 0) => `${isoX(x, y)},${isoY(x, y) - h}`;

const WALLS: { pts: [number, number][]; o: number }[] = [
  { pts: [[0, 0], [300, 0]], o: 0 },
  { pts: [[0, 0], [0, 70]], o: 1 },
  { pts: [[0, 120], [0, 190]], o: 2 },
  { pts: [[187.5, 10], [187.5, 60]], o: 3 },
  { pts: [[187.5, 95], [187.5, 180]], o: 4 },
  { pts: [[300, 0], [300, 190]], o: 5 },
  { pts: [[0, 190], [120, 190]], o: 6 },
  { pts: [[200, 190], [300, 190]], o: 7 },
];

const STAGE_META = [
  { label: "Исходник · эскиз", step: "Эскиз", hint: "получен от заказчика" },
  { label: "Вычерчивание · М 1:50", step: "Чертёж", hint: "размеры, оси, рамка" },
  { label: "Объём · h 2 700", step: "Модель 3D", hint: "объём для проверки" },
];

/** Одна «отрисовывающаяся» линия. */
function L({
  d,
  delay = 0,
  stroke = "#eaf6ff",
  w = 2,
  opacity = 1,
}: {
  d: string;
  delay?: number;
  stroke?: string;
  w?: number;
  opacity?: number;
}) {
  return (
    <path
      d={d}
      pathLength={100}
      className="bp-draw"
      style={{ animationDelay: `${delay}s` }}
      fill="none"
      stroke={stroke}
      strokeWidth={w}
      strokeLinecap="round"
      opacity={opacity}
      vectorEffect="non-scaling-stroke"
    />
  );
}

export default function BlueprintScene() {
  const { reduced } = useMotion();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const t = window.setTimeout(
      () => setStage((s) => (s + 1) % 4),
      DUR[stage],
    );
    return () => window.clearTimeout(t);
  }, [stage, reduced]);

  const visual = reduced ? 1 : stage === 3 ? 2 : stage; // 3 — стадия затухания перед циклом
  const meta = STAGE_META[visual];

  return (
    <figure className="relative" aria-labelledby="bp-caption">
      <svg
        viewBox="0 0 560 440"
        role="img"
        aria-label="Анимация процесса: карандашный эскиз превращается в точный чертёж, затем стены поднимаются в объёмную 3D-модель"
        className="block h-auto w-full cursor-crosshair select-none"
      >
        <defs>
          <pattern id="bp-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" stroke="rgba(125,185,255,0.07)" strokeWidth="1" />
          </pattern>
          <pattern id="bp-grid-major" width="140" height="140" patternUnits="userSpaceOnUse">
            <path d="M140 0H0V140" fill="none" stroke="rgba(125,185,255,0.13)" strokeWidth="1" />
          </pattern>
          <linearGradient id="bp-scan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(87,214,255,0)" />
            <stop offset="0.5" stopColor="rgba(87,214,255,0.16)" />
            <stop offset="1" stopColor="rgba(87,214,255,0)" />
          </linearGradient>
          <linearGradient id="bp-wall" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="rgba(46,195,247,0.05)" />
            <stop offset="1" stopColor="rgba(46,195,247,0.22)" />
          </linearGradient>
        </defs>

        {/* лист */}
        <rect x="1" y="1" width="558" height="438" fill="#070d18" stroke="rgba(148,197,255,0.18)" />
        <rect x="16" y="16" width="528" height="408" fill="url(#bp-grid)" stroke="rgba(148,197,255,0.14)" />
        <rect x="16" y="16" width="528" height="408" fill="url(#bp-grid-major)" stroke="none" />
        {/* риски по углам поля */}
        <g stroke="rgba(154,230,255,0.8)" strokeWidth="1.4">
          <path d="M16 34 V16 H34" fill="none" />
          <path d="M526 16 H544 V34" fill="none" />
          <path d="M544 406 V424 H526" fill="none" />
          <path d="M34 424 H16 V406" fill="none" />
        </g>

        {/* реквизиты листа */}
        <text x="30" y="42" fill="#8ba2bd" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2.5">
          ФОРМАТ А1 · М 1:50
        </text>
        <text x="530" y="42" textAnchor="end" fill="#2ec3f7" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
          {meta.label.toUpperCase()}
        </text>

        {/* HUD-перекрестие */}
        <g opacity="0.85">
          <circle cx="96" cy="330" r="34" fill="none" stroke="rgba(87,214,255,0.35)" strokeWidth="1" strokeDasharray="4 6" className={reduced ? "" : "animate-spin-slow"} style={{ transformOrigin: "96px 330px" }} />
          <path d="M96 296 V364 M62 330 H130" stroke="rgba(87,214,255,0.3)" strokeWidth="1" />
          <circle cx="96" cy="330" r="2.5" fill="#57d6ff" />
        </g>

        {/* штамп */}
        <g fontFamily="JetBrains Mono, monospace">
          <rect x="352" y="364" width="192" height="60" fill="#0a1322" stroke="rgba(148,197,255,0.3)" />
          <path d="M352 384 H544 M352 404 H544 M416 364 V424 M470 364 V404" stroke="rgba(148,197,255,0.22)" />
          <text x="358" y="378" fontSize="7" fill="#64798f" letterSpacing="1">РАЗРАБ.</text>
          <text x="422" y="378" fontSize="8" fill="#aec4da" letterSpacing="1">СПЕЦ. НА ЧАС</text>
          <text x="358" y="398" fontSize="7" fill="#64798f" letterSpacing="1">ПРОВ.</text>
          <text x="422" y="398" fontSize="8" fill="#ffb454" letterSpacing="1">СОЗДАТЕЛЬ</text>
          <text x="358" y="418" fontSize="7" fill="#64798f" letterSpacing="1">СТАДИЯ</text>
          <text x="422" y="418" fontSize="8" fill="#2ec3f7" letterSpacing="0.5">ЭСКИЗ → ЧЕРТЁЖ → 3D</text>
          <text x="476" y="378" fontSize="7" fill="#64798f" letterSpacing="1">ЛИСТ 1</text>
          <text x="476" y="398" fontSize="7" fill="#64798f" letterSpacing="1">П-1</text>
        </g>

        {/* статусная строка */}
        <g fontFamily="JetBrains Mono, monospace">
          <circle cx="34" cy="410" r="3" fill="#57d6ff" className={reduced ? "" : "animate-blink"} />
          <text x="44" y="414" fontSize="9" fill="#8ba2bd" letterSpacing="1.5">
            {reduced ? "СТАТИЧНЫЙ РЕЖИМ · АНИМАЦИЯ ВЫКЛЮЧЕНА" : `ОБРАБОТКА · ШАГ ${visual + 1}/3`}
          </text>
          <text x="34" y="430" fontSize="8" fill="#55677d" letterSpacing="1.5">X 258.40 / Y 194.20 · UTC+3 СПБ</text>
        </g>

        {/* контент стадий (затухает в конце цикла) */}
        <g style={{ opacity: stage === 3 || reduced ? (reduced ? 1 : 0) : 1, transition: "opacity 0.6s ease" }}>
          {/* ---------- ЭСКИЗ ---------- */}
          {(visual === 0 || visual === 1) && (
            <g
              key={`sk-${stage >= 3 ? "end" : "run"}`}
              transform="translate(148 88)"
              style={{ opacity: visual === 0 ? 0.92 : 0.12, transition: "opacity 0.8s ease" }}
              stroke="#c7cdd4"
              fill="none"
            >
              <L d="M2 -1 L99 2.5 L152 -2 L204 2.5 L301 0 L300.5 61 L303 121 L299.5 191 L203 188.5 L146 191.5 L48 188 L0 192 L-1.5 123 L2 68 L-2 1" w={2.4} delay={0} />
              <L d="M186 8 L189 62 M186.5 97 L188.5 182" w={2.2} delay={0.25} />
              <L d="M14 66 Q52 74 58 116" w={1.6} delay={0.55} />
              <L d="M14 116 L58 116" w={1.6} delay={0.7} />
              <L d="M118 189.5 L118 184 M201 190 L201 184" w={1.8} delay={0.85} />
              <L d="M20 214 L280 210 M20 208 L20 220 M280 204 L280 216" w={1.3} delay={1} opacity={0.8} />
              <L d="M236 196 L272 168 M236 186 L242 198" w={1.4} delay={1.15} stroke="#ffb454" />
              <text
                x="118"
                y="236"
                fill="#aab2ba"
                fontSize="11"
                fontStyle="italic"
                fontFamily="JetBrains Mono, monospace"
                className="bp-fade-in"
                style={{ animationDelay: "1.3s" }}
              >
                примерно так… ≈ 6 м?
              </text>
            </g>
          )}

          {/* ---------- ЧЕРТЁЖ ---------- */}
          {visual >= 1 && (
            <>
              <g
                key="geom"
                style={{
                  transform: visual === 2 ? ISO : FLAT,
                  transition: reduced ? "none" : "transform 1.05s cubic-bezier(0.65, 0.02, 0.23, 1)",
                }}
              >
                {/* заливка стен */}
                <g fill="rgba(46,195,247,0.13)" className={reduced ? "" : "bp-fade-in"} style={{ animationDelay: "0.9s" }}>
                  <path fillRule="evenodd" d="M0 0 H300 V190 H0 Z M10 10 H290 V180 H10 Z" />
                  <path d="M183.5 10 H191.5 V60 H183.5 Z M183.5 95 H191.5 V180 H183.5 Z" />
                </g>
                {/* контур стен */}
                <L d="M0 0 H300 V190 H0 Z" w={2.4} delay={0} />
                <L d="M10 10 H290 V180 H10 Z" w={1.6} delay={0.12} />
                <L d="M183.5 10 H191.5 M183.5 10 V60 M191.5 60 H183.5 M191.5 95 V180 H183.5 V95" w={1.6} delay={0.24} />
                {/* проёмы */}
                <L d="M0 70 H10 M0 120 H10" w={1.4} delay={0.4} />
                <L d="M10 120 L60 120 M10 70 A 50 50 0 0 0 60 120" w={1.2} delay={0.5} stroke="#9ae6ff" />
                <L d="M152.5 95 L187.5 95 M187.5 60 A 35 35 0 0 0 152.5 95" w={1.2} delay={0.6} stroke="#9ae6ff" />
                {/* окно */}
                <L d="M120 182 H200 M120 185.5 H200 M120 189 H200" w={1} delay={0.7} stroke="#9ae6ff" />
                {/* мебель */}
                <g stroke="#57d6ff" opacity="0.55">
                  <L d="M16 16 H112 V76 H16 Z M16 30 H112" w={1} delay={0.8} />
                  <L d="M16 132 H88 V176 H16 Z M26 132 V176" w={1} delay={0.9} />
                  <L d="M200 14 H286 V40 H200 Z" w={1} delay={1} />
                  <L d="M226 84 m-22 0 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0" w={1} delay={1.1} />
                  <L d="M200 132 H286 V172 H200 Z" w={1} delay={1.2} />
                </g>
                {/* подписи помещений */}
                <g fontFamily="JetBrains Mono, monospace" fill="#aec4da" className={reduced ? "" : "bp-fade-in"} style={{ animationDelay: "1.15s" }}>
                  <text x="24" y="112" fontSize="11" letterSpacing="3">ГОСТИНАЯ</text>
                  <text x="24" y="126" fontSize="9" fill="#64798f" letterSpacing="1.5">18,4 м²</text>
                  <text x="205" y="60" fontSize="10" letterSpacing="3">КАБИНЕТ</text>
                  <text x="205" y="73" fontSize="9" fill="#64798f" letterSpacing="1.5">7,2 м²</text>
                </g>
              </g>

              {/* размерные линии (не «укладываются» в объём) */}
              <g
                key={`dims-${visual}`}
                transform="translate(148 88)"
                style={{ opacity: visual === 2 ? 0 : 1, transition: "opacity 0.5s ease" }}
                fontFamily="JetBrains Mono, monospace"
              >
                <g stroke="#2ec3f7" fill="none">
                  <L d="M0 200 V226 M187.5 200 V226 M300 200 V226" w={1} delay={1.15} />
                  <L d="M-6 220 H306" w={1} delay={1.25} />
                  <L d="M0 220 l7 -3 M0 220 l7 3 M187.5 220 l7 -3 M187.5 220 l7 3 M300 220 l7 -3 M300 220 l7 3" w={1.2} delay={1.35} />
                  <L d="M-14 0 H-34 M-14 190 H-34 M-28 -6 V196" w={1} delay={1.3} />
                </g>
                <text x="93.75" y="214" textAnchor="middle" fontSize="10" fill="#57d6ff" className={reduced ? "" : "bp-fade-in"} style={{ animationDelay: "1.45s" }}>3 750</text>
                <text x="243.75" y="214" textAnchor="middle" fontSize="10" fill="#57d6ff" className={reduced ? "" : "bp-fade-in"} style={{ animationDelay: "1.5s" }}>2 250</text>
                <text x="-40" y="95" textAnchor="middle" fontSize="10" fill="#57d6ff" transform="rotate(-90 -40 95)" className={reduced ? "" : "bp-fade-in"} style={{ animationDelay: "1.55s" }}>3 800</text>
              </g>
            </>
          )}

          {/* ---------- ОБЪЁМНАЯ МОДЕЛЬ ---------- */}
          {visual === 2 && (
            <g>
              {/* плоскость пола */}
              <polygon
                points={`${P(0, 0)} ${P(300, 0)} ${P(300, 190)} ${P(0, 190)}`}
                fill="rgba(13,25,48,0.88)"
                stroke="rgba(87,214,255,0.3)"
                strokeWidth="1"
                className={reduced ? "" : "bp-fade-in"}
              />
              {/* стены */}
              {WALLS.map((w) => {
                const [[x1, y1], [x2, y2]] = w.pts;
                return (
                  <g key={w.o} className={reduced ? "" : "bp-fade-in"} style={{ animationDelay: `${0.15 + w.o * 0.1}s` }}>
                    <polygon
                      points={`${P(x1, y1)} ${P(x2, y2)} ${P(x2, y2, WH)} ${P(x1, y1, WH)}`}
                      fill="url(#bp-wall)"
                      stroke="rgba(154,230,255,0.75)"
                      strokeWidth="1"
                    />
                    <line x1={isoX(x1, y1)} y1={isoY(x1, y1) - WH} x2={isoX(x2, y2)} y2={isoY(x2, y2) - WH} stroke="#dff3ff" strokeWidth="1.4" />
                  </g>
                );
              })}
              {/* окно: подоконник и стекло */}
              <g className={reduced ? "" : "bp-fade-in"} style={{ animationDelay: "1s" }}>
                <polygon points={`${P(120, 190)} ${P(200, 190)} ${P(200, 190, 22)} ${P(120, 190, 22)}`} fill="url(#bp-wall)" stroke="rgba(154,230,255,0.6)" strokeWidth="1" />
                <polygon points={`${P(120, 190, 22)} ${P(200, 190, 22)} ${P(200, 190, WH)} ${P(120, 190, WH)}`} fill="rgba(154,230,255,0.18)" stroke="rgba(223,243,255,0.8)" strokeWidth="1" />
              </g>
              {/* вертикали-направляющие */}
              <g stroke="rgba(87,214,255,0.45)" strokeDasharray="3 4" className={reduced ? "" : "bp-fade-in"} style={{ animationDelay: "1.15s" }}>
                <line x1={isoX(0, 0)} y1={isoY(0, 0)} x2={isoX(0, 0)} y2={isoY(0, 0) - WH - 12} />
                <line x1={isoX(300, 190)} y1={isoY(300, 190)} x2={isoX(300, 190)} y2={isoY(300, 190) - WH - 12} />
              </g>
              {/* выноски */}
              <g fontFamily="JetBrains Mono, monospace" className={reduced ? "" : "bp-fade-in"} style={{ animationDelay: "1.3s" }}>
                <line x1={isoX(300, 0)} y1={isoY(300, 0) - WH} x2={isoX(300, 0) + 44} y2={isoY(300, 0) - WH - 26} stroke="#57d6ff" strokeWidth="1" />
                <rect x={isoX(300, 0) + 46} y={isoY(300, 0) - WH - 40} width="96" height="20" fill="#0a1322" stroke="rgba(87,214,255,0.5)" />
                <text x={isoX(300, 0) + 54} y={isoY(300, 0) - WH - 26} fontSize="9" fill="#9ae6ff" letterSpacing="1">h = 2 700</text>
                <line x1={(isoX(120, 190) + isoX(200, 190)) / 2} y1={isoY(160, 190) - WH} x2={(isoX(120, 190) + isoX(200, 190)) / 2 - 60} y2={isoY(160, 190) - WH - 20} stroke="#57d6ff" strokeWidth="1" />
                <rect x={(isoX(120, 190) + isoX(200, 190)) / 2 - 172} y={isoY(160, 190) - WH - 34} width="110" height="20" fill="#0a1322" stroke="rgba(87,214,255,0.5)" />
                <text x={(isoX(120, 190) + isoX(200, 190)) / 2 - 164} y={isoY(160, 190) - WH - 20} fontSize="9" fill="#9ae6ff" letterSpacing="1">окно 1 800</text>
              </g>
            </g>
          )}
        </g>

        {/* сканирующая полоса при смене стадии */}
        {!reduced && (
          <rect key={`scan-${stage}`} className="bp-scan" x="16" y="16" width="80" height="408" fill="url(#bp-scan)" opacity="0.8" />
        )}
      </svg>

      {/* шаги под листом */}
      <figcaption id="bp-caption" className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        {STAGE_META.map((s, i) => {
          const active = reduced ? i === 1 : visual === i && stage !== 3;
          return (
            <div
              key={s.step}
              className={`border-t pt-2.5 transition-colors duration-500 ${active ? "border-accent-400" : "border-line"}`}
              aria-current={active ? "step" : undefined}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${active ? "text-accent-400" : "text-fog-500"}`}>
                  0{i + 1}
                </span>
                <span className={`truncate text-[11px] font-semibold sm:text-xs ${active ? "text-paper" : "text-fog-400"}`}>
                  {s.step}
                </span>
              </div>
              <p className="mt-1 hidden font-mono text-[10px] text-fog-500 sm:block">{s.hint}</p>
              <div className="mt-2 h-0.5 overflow-hidden rounded bg-ink-800">
                {active && !reduced ? (
                  <div
                    key={`${stage}-${i}`}
                    className="h-full w-full origin-left bg-accent-400"
                    style={{ animation: `fillX ${DUR[i]}ms linear forwards` }}
                  />
                ) : (
                  <div className={`h-full w-full origin-left ${active ? "bg-accent-400" : "bg-transparent"}`} />
                )}
              </div>
            </div>
          );
        })}
      </figcaption>
    </figure>
  );
}
