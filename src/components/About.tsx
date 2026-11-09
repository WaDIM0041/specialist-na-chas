import { SectionHead } from "../lib/ui";
import { Reveal } from "../lib/motion";

export default function About() {
  return (
    <section id="обо-мне" className="scroll-mt-20 py-20 md:py-28" aria-labelledby="about-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead index="03" kicker="Обо мне" title="Специалист на связи" note="Работаю удалённо, в Санкт-Петербурге возможен выезд по договорённости." />
        <Reveal>
          <div className="max-w-3xl space-y-5 text-base leading-relaxed text-fog-300">
            <p>Помогаю с чертежами и визуализацией, документами, сайтами, автоматизацией, фотографиями и видео. Могу принять задачу, обсудить её с заказчиком и довести до результата.</p>
            <p>У меня инженерный опыт: прошёл путь от монтажника фасадов и структурного остекления до заместителя директора. Руководил работами на объекте и общался с заказчиком от приёмки объекта до сдачи.</p>
            <p>Работаю в Archicad, AutoCAD, SketchUp и Photoshop. Использую инструменты искусственного интеллекта при подготовке материалов и решении рабочих задач.</p>
            <p className="text-paper">Открыт к постоянной удалённой работе и разовым заказам.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
