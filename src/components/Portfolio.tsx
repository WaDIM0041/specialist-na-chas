import { useState } from "react";
import { ChevronsLeftRight, Link2, Play, ArrowRight } from "lucide-react";
import { SectionHead, DemoTag, TickedCard, Meta } from "../lib/ui";
import { Reveal } from "../lib/motion";

/* ------------------------------------------------------------------ */
/*  CompareSlider — доступное сравнение «до/после».                    */
/*  Работает указателем, касанием и клавиатурой (стрелки).             */
/* ------------------------------------------------------------------ */

function CompareSlider({
  before,
  after,
  labelBefore,
  labelAfter,
  alt,
}: {
  before: string;
  after: string;
  labelBefore: string;
  labelAfter: string;
  alt: string;
}) {
  const [pos, setPos] = useState(52);
  return (
    <div className="group/cmp relative aspect-[4/3] overflow-hidden border border-line bg-ink-950 has-[input:focus-visible]:outline has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-4 has-[input:focus-visible]:outline-accent-400">
      <img src={after} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <img
        src={before}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />
      {/* делитель */}
      <div aria-hidden className="absolute inset-y-0 w-px bg-accent-300 shadow-[0_0_12px_rgba(87,214,255,0.9)]" style={{ left: `${pos}%` }} />
      <div
        aria-hidden
        className="absolute top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent-300 bg-ink-950/90 text-accent-300"
        style={{ left: `${pos}%` }}
      >
        <ChevronsLeftRight className="h-4 w-4" />
      </div>
      {/* подписи сторон */}
      <span className="absolute left-2.5 top-2.5 bg-ink-950/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fog-300 backdrop-blur-sm">
        {labelBefore}
      </span>
      <span className="absolute right-2.5 top-2.5 bg-accent-500/90 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-950">
        {labelAfter}
      </span>
      {/* доступный ползунок */}
      <input
        type="range"
        min={4}
        max={96}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Сравнение «${labelBefore} / ${labelAfter}»: ${alt}`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

const CASES = [
  {
    code: "Р-01",
    format: "Эскиз → чертёж",
    slider: { before: "./images/sketch.jpg", after: "./images/plan.jpg", labelBefore: "Эскиз", labelAfter: "Чертёж" },
    alt: "План квартиры: сравнение карандашного эскиза и готового чертежа",
    task: "По фото эскиза с размерами подготовить аккуратный план для согласования перепланировки.",
    done: "Пример оформления плана и размеров в Archicad.",
    result: "Пример результата: план в PDF и исходный файл.",
    media: "место для исходных файлов",
  },
  {
    code: "Р-02",
    format: "Фото до и после",
    slider: { before: "./images/room-before.jpg", after: "./images/room-after.jpg", labelBefore: "До", labelAfter: "После" },
    alt: "Комната: сравнение состояния до ремонта и после",
    task: "Показать заказчику комнату после обновления — до закупки материалов и мебели.",
    done: "Пример визуализации отделки, света и мебели.",
    result: "Пример результата: сравнительная визуализация.",
    media: "место для серии фото или видео",
  },
  {
    code: "Р-03",
    format: "Цифровой проект",
    image: "./images/project-digital.jpg",
    alt: "Цифровой проект: страница сайта и 3D-модель",
    task: "Оживить страницу услуги и заранее показать результат работ клиенту.",
    done: "Пример страницы и визуальных материалов.",
    result: "Пример результата: страница цифрового проекта.",
    media: "место для видеообзора или ссылки",
  },
];

export default function Portfolio() {
  return (
    <section id="работы" className="relative scroll-mt-20 border-t border-line-soft bg-ink-900/30 py-20 md:py-28" aria-labelledby="works-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          index="02"
          kicker="Портфолио"
          title="Работы: задача → результат"
          note="Примеры оформления портфолио. Изображения и описания демонстрационные, реальные работы добавим после подготовки материалов."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <Reveal key={c.code} delay={i * 100}>
              <TickedCard className="h-full">
                <article className="flex h-full flex-col border border-line bg-ink-950/70 transition-colors duration-500 group-hover/card:border-accent-400/40">
                  <div className="flex items-center justify-between gap-3 px-5 pt-5">
                    <Meta>{c.code}</Meta>
                    <DemoTag label="демо-пример" />
                  </div>

                  <h3 className="px-5 pt-3 font-display text-lg font-semibold text-paper">{c.format}</h3>

                  <div className="relative mt-4 px-5">
                    {c.slider ? (
                      <CompareSlider
                        before={c.slider.before}
                        after={c.slider.after}
                        labelBefore={c.slider.labelBefore}
                        labelAfter={c.slider.labelAfter}
                        alt={c.alt}
                      />
                    ) : (
                      <div className="group/img relative aspect-[4/3] overflow-hidden border border-line">
                        <img
                          src={c.image}
                          alt={c.alt}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-[1.04]"
                          loading="lazy"
                        />
                        <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-2 bg-ink-950/85 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-fog-300 backdrop-blur-sm">
                          <Play className="h-3 w-3 text-accent-400" />
                          {c.media}
                        </span>
                      </div>
                    )}
                  </div>

                  <dl className="mt-5 flex-1 space-y-3.5 px-5 text-[13px] leading-relaxed">
                    {[
                      ["Задача", c.task],
                      ["Что сделал", c.done],
                      ["Результат", c.result],
                    ].map(([k, v], j) => (
                      <div key={k} className="flex gap-3">
                        <dt className="w-20 shrink-0 font-mono text-[10px] uppercase leading-5 tracking-[0.16em] text-fog-500">
                          {k}
                        </dt>
                        <dd className={j === 2 ? "text-paper" : "text-fog-400"}>{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-5 flex items-center justify-between border-t border-line-soft px-5 py-3.5">
                    <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fog-500">
                      <Link2 className="h-3.5 w-3.5" />
                      {c.media}
                    </span>
                    <ArrowRight className="h-4 w-4 text-fog-500 transition-all duration-300 group-hover/card:translate-x-1 group-hover/card:text-accent-400" aria-hidden />
                  </div>
                </article>
              </TickedCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140} className="mt-10">
          <p className="border border-line-soft bg-ink-900/50 px-5 py-4 text-sm leading-relaxed text-fog-400">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-400">Наши проекты: </span>
            ANNA KAM, W-Optics и «Через время к звёздам». Описание личного вклада и результаты по этим проектам
            добавим после подготовки материалов.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
