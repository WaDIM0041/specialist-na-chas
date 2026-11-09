import { SectionHead } from "../lib/ui";
import { Reveal } from "../lib/motion";

export default function About() {
  return (
    <section id="обо-мне" className="scroll-mt-20 py-20 md:py-28" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead index="03" kicker="Обо мне" title="Один специалист — несколько направлений" note="Работаю удалённо, в Санкт-Петербурге возможен выезд по договорённости." />
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <Reveal>
          <figure className="relative border border-line bg-ink-900">
            <img src="./images/creator-portrait.jpg" alt="Специалист на час за рабочим столом" className="aspect-[4/5] w-full object-cover object-[center_60%]" loading="lazy" />
          </figure>
        </Reveal>
        <Reveal>
          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-fog-300">
            <h3 className="font-display text-2xl font-semibold text-paper">Специалист на час</h3>
            <p>Беру на себя задачи на стыке инженерии и цифровой работы: от чертежей, визуализации и документов до сайтов, автоматизации и контента. Могу вести несколько направлений, организовывать работу, общаться с заказчиком и доводить задачи до результата.</p>
            <p>Например, в одном проекте могу подготовить чертежи и материалы, оформить документацию, помочь с сайтом и координировать работу по этим направлениям. Состав задач и формат участия определяем вместе.</p>
            <p>У меня инженерный опыт: прошёл путь от монтажника фасадов и структурного остекления до заместителя директора. Руководил работами на объекте и общался с заказчиком от приёмки объекта до сдачи.</p>
            <p>Работаю в Archicad, AutoCAD, SketchUp и Photoshop. Использую инструменты искусственного интеллекта при подготовке материалов и решении рабочих задач.</p>
            <div className="border border-line bg-ink-900/60 p-5"><p className="text-sm text-paper">Рабочие инструменты</p><p className="mt-3 text-sm">Archicad · AutoCAD · SketchUp · Photoshop</p></div>
            <p>Резюме HeadHunter появится после добавления ссылки.</p>
            <p className="text-paper">Открыт к постоянной удалённой работе и разовым заказам.</p>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
