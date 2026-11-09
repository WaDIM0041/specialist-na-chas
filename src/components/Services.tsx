import {
  DraftingCompass,
  FileSpreadsheet,
  MonitorSmartphone,
  Clapperboard,
  Laptop,
  Wrench,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { SectionHead, TickedCard, Meta } from "../lib/ui";
import { Reveal } from "../lib/motion";

const REMOTE = [
  {
    icon: MonitorSmartphone,
    code: "С-01",
    title: "Сайты и автоматизация",
    text: "Создание и доработка страниц, внедрение чат-ботов и ИИ-агентов на коммерческие и другие сайты. Автоматизация задач с заявками, файлами и таблицами.",
    task: "«Нужна страница под новую услугу, заявки — в таблицу»",
    result: "Страница с формой; заявки сами попадают в таблицу",
    tags: ["Сайты", "Чат-боты", "ИИ-агенты"],
  },
  {
    icon: Clapperboard,
    code: "С-02",
    title: "Контент, фото и видео",
    text: "Публикации для сайтов и соцсетей, редактирование и оживление фотографий, видео и поздравления к праздникам.",
    task: "«Оживите наше старое фото к юбилею мамы»",
    result: "Видеопоздравление с музыкой, титрами и ожившим кадром",
    tags: ["Фото", "Видео", "Титры"],
  },
  {
    icon: DraftingCompass,
    code: "С-03",
    title: "Чертежи и 3D",
    text: "План от руки или эскиз с размерами превращается в чертёж, планировку, фасад или визуализацию.",
    task: "«Эскиз кухни с размерами из переписки»",
    result: "План в масштабе с размерами + 3D-вид для согласования",
    tags: ["PDF", "DWG", "3D"],
  },
  {
    icon: FileSpreadsheet,
    code: "С-04",
    title: "Сметы и документы",
    text: "Сверка позиций, объёмов и сумм по исходным данным. Сравнение предложений, оформление таблиц, документов и текстов.",
    task: "«Три коммерческих предложения от подрядчиков»",
    result: "Сводная таблица с различиями в предложениях",
    tags: ["XLSX", "DOCX", "PDF"],
  },
];

const OFFLINE = [
  {
    icon: Laptop,
    code: "СПб-01",
    title: "Компьютерный мастер",
    text: "Настройка, установка программ, разбор «тормозит и не включается», перенос файлов. Помощь удалённо или с выездом по Санкт-Петербургу — по договорённости.",
    mode: "Удалённо или выезд",
  },
  {
    icon: Wrench,
    code: "СПб-02",
    title: "Мастер на все руки",
    text: "Мелкий бытовой ремонт: сборка мебели, электрика и сантехника, повесить, прикрутить, подклеить. По Санкт-Петербургу — по договорённости.",
    mode: "Выезд по СПб",
  },
];

export default function Services() {
  return (
    <section id="услуги" className="relative scroll-mt-20 py-20 md:py-28" aria-labelledby="services-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          index="01"
          kicker="Рубрики услуг"
          title="Услуги удалённо и в Санкт-Петербурге"
          note="Удалённые задачи, проектные работы и помощь с выездом по договорённости."
        />

        {/* четыре удалённые карточки */}
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {REMOTE.map((s, i) => (
            <Reveal as="li" key={s.code} delay={i * 90}>
              <TickedCard className="h-full">
                <article className="flex h-full flex-col border border-line bg-ink-900/60 p-5 transition-colors duration-500 group-hover/card:border-accent-400/40 group-hover/card:bg-ink-850 lg:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center border border-line bg-ink-950 text-accent-400">
                      <s.icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <Meta>{s.code}</Meta>
                  </div>
                  <h3 className="mt-5 font-display text-[17px] font-semibold leading-snug text-paper">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fog-400">{s.text}</p>

                  <div className="mt-5 flex-1 space-y-3 border-t border-line-soft pt-4 text-[13px] leading-relaxed">
                    <p className="text-fog-500">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog-500">Задача: </span>
                      <span className="text-fog-300">{s.task}</span>
                    </p>
                    <p className="flex gap-2 text-fog-300">
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-400" aria-hidden />
                      <span>{s.result}</span>
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span key={t} className="border border-line-soft bg-ink-950 px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-fog-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </TickedCard>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120} className="mt-10 md:mt-12">
          <article className="border border-line bg-ink-900/60 p-5 lg:p-6">
            <h3 className="font-display text-lg font-semibold text-paper">Фасадные системы и структурное остекление</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-fog-300">
              Разработка фасадных систем и структурного остекления с нуля до сдачи объекта.
              Организация работ, руководство монтажниками и общение с заказчиком на всех этапах.
              Формат участия и выезд на объект обсуждаются отдельно.
            </p>
          </article>
        </Reveal>

        {/* два формата с выездом */}
        <Reveal delay={120} className="mt-10 md:mt-12">
          <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-fog-500">
            <MapPin className="h-3.5 w-3.5 text-demo-400" />
            Офлайн-форматы · Санкт-Петербург · по договорённости
          </div>
        </Reveal>
        <ul className="grid gap-4 md:grid-cols-2">
          {OFFLINE.map((s, i) => (
            <Reveal as="li" key={s.code} delay={i * 110}>
              <article className="group relative flex h-full gap-5 border border-dashed border-demo-400/35 bg-gradient-to-br from-ink-900/70 to-ink-950 p-5 transition-colors duration-500 hover:border-demo-400/70 sm:p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-demo-400/40 bg-ink-950 text-demo-400">
                  <s.icon className="h-5.5 w-5.5" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-display text-[16px] font-semibold text-paper">{s.title}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog-500">{s.code}</span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-fog-400">{s.text}</p>
                  <p className="mt-4 inline-flex items-center gap-2 border border-demo-400/35 bg-demo-400/8 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-demo-400">
                    <MapPin className="h-3 w-3" />
                    {s.mode}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
