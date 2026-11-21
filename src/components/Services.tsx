import {
  DraftingCompass,
  FileSpreadsheet,
  MonitorSmartphone,
  Clapperboard,
  Laptop,
  Wrench,
  ArrowRight,
  MapPin,
  Sparkles,
} from "lucide-react";
import { SectionHead, TickedCard, Meta } from "../lib/ui";
import { Reveal } from "../lib/motion";
import HouseSketch from "./HouseSketch";

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
  {
    icon: Sparkles,
    code: "С-05",
    title: "Настройка ИИ и обучение",
    text: "Помогу подобрать и настроить ИИ под ваши рабочие задачи или проект. На вашем примере объясню, как сформулировать запрос, проверить ответ и доработать результат. Вместе настроим рабочий процесс, который вы сможете повторить самостоятельно.",
    task: "«Хочу использовать ИИ в работе, но не знаю, с чего начать»",
    result: "Настроенный инструмент, готовые запросы для ваших задач и пошаговая инструкция",
    tags: ["Настройка ИИ", "Обучение", "Рабочие задачи"],
  },
];

const OFFLINE = [
  {
    icon: Laptop,
    code: "СПб-01",
    title: "Компьютерный мастер",
    text: "Установка, переустановка и перенос Windows, установка и настройка программ, перенос файлов, настройка рабочего стола и помощь с медленной работой компьютера. Проверка системы и удаление вирусов, настройка роутеров, Wi‑Fi, домашней или рабочей сети и общего доступа к файлам. Помогу установить и настроить инструменты искусственного интеллекта и агентов автоматизации, покажу, как ими пользоваться для ваших задач. Помощь удалённо или с выездом по Санкт-Петербургу — по договорённости.",
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

// Карточка бытового мастера временно скрыта.
const SHOW_HANDYMAN = false;

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

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {REMOTE.map((s, i) => (
            <Reveal as="li" key={s.code} delay={i * 90} className={s.code === "С-05" ? "sm:col-span-2" : undefined}>
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
          <article className="overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-[#173541] via-[#0d1720] to-[#08121a]">
            <div className="p-6 sm:p-8 lg:px-10 lg:py-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-300">Инженерная практика · фасады</p>
                <h3 className="mt-6 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">Фасады, <span className="text-accent-300">структурное остекление</span></h3>
                <p className="mt-4 text-sm leading-relaxed text-fog-400">Профессиональный путь в фасадных системах — от монтажника до руководителя. Опыт включает разработку и корректировку чертежей и технических решений, организацию монтажа и руководство работами.</p>
                <p className="mt-4 text-sm leading-relaxed text-fog-400">Опыт работы с вентилируемыми фасадами и структурным остеклением: сопровождение работ, взаимодействие с заказчиками и координация подрядчиков, в том числе совместная работа с монтажными бригадами из Китая.</p>
                <p className="mt-6 text-sm text-accent-300">Монтаж → AutoCAD → Управление</p>
            </div>
            <div className="flex flex-col gap-5 border-t border-line p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between"><div><h4 className="font-display text-lg font-semibold text-paper">Чем могу помочь</h4><div className="mt-3 flex flex-wrap gap-2">{["Фасадные решения", "Чертежи и узлы", "AutoCAD / ППР", "Организация монтажа", "Координация подрядчиков"].map(item => <span key={item} className="rounded border border-line px-3 py-2 text-xs text-fog-300">{item}</span>)}</div></div><a className="inline-flex shrink-0 items-center justify-center gap-3 rounded bg-accent-400 px-5 py-3 text-sm font-semibold text-ink-950" href="https://t.me/Wadim_8884" target="_blank" rel="noopener noreferrer">Обсудить фасадный проект ↗</a></div>
          </article>
        </Reveal>
        <ComputerHelp />
      </div>
      <HouseSketch />
    </section>
  );
}

function ComputerHelp() {
  return <section aria-labelledby="computer-help-title">


        {
          <>
            {/* Компьютерная помощь доступна удалённо и с выездом. */}
            <Reveal delay={120} className="mt-10 md:mt-12">
              <h3 id="computer-help-title" className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-fog-500">
                <MapPin className="h-3.5 w-3.5 text-demo-400" />
                Компьютерная помощь · удалённо или с выездом
              </h3>
            </Reveal>
            <ul className="grid gap-4">
              {OFFLINE.filter((s) => SHOW_HANDYMAN || s.code !== "СПб-02").map((s, i) => (
                <Reveal as="li" key={s.code} delay={i * 110}>
                  <article className="group relative flex h-full gap-5 border border-dashed border-demo-400/35 bg-gradient-to-br from-ink-900/70 to-ink-950 p-5 transition-colors duration-500 hover:border-demo-400/70 sm:p-6">
                    <span className="grid h-12 w-12 shrink-0 place-items-center border border-demo-400/40 bg-ink-950 text-demo-400">
                      <s.icon className="h-5.5 w-5.5" strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h4 className="font-display text-[16px] font-semibold text-paper">{s.title}</h4>
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
          </>
        }
  </section>;
}
