import { SectionHead } from "../lib/ui";
import { Reveal } from "../lib/motion";

const projects = [
  { name: "ANNA KAM", description: "Развитие сайта и цифровых услуг." },
  { name: "W-Optics", description: "Работа над сайтом проекта оптики." },
  { name: "Через время к звёздам", description: "Цифровое издание романа с изображениями, видео и музыкой." },
];

export default function Portfolio() {
  return (
    <section id="работы" className="scroll-mt-20 border-t border-line-soft bg-ink-900/30 py-20 md:py-28" aria-labelledby="works-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead index="02" kicker="Портфолио" title="Проекты" note="Сайты и цифровые проекты, над которыми я работаю." />
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <Reveal key={project.name}>
              <article className="h-full border border-line bg-ink-950/70 p-6">
                <h3 className="font-display text-xl font-semibold text-paper">{project.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-fog-300">{project.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
