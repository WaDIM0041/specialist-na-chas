import { useEffect, useRef } from "react";
import "./house-sketch.css";

export default function HouseSketch() {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = container.current;
    const video = box?.querySelector("video");
    if (!box || !video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const clips = ["./videos/house-sketch-web.mp4", "./videos/house-sketch-second-web.mp4"];
    let visible = false, clipIndex = 0, generation = 0;
    let timer: ReturnType<typeof setTimeout>;
    const stop = () => { generation++; clearTimeout(timer); video.pause(); box.classList.remove("is-playing", "is-revealing"); };
    const start = () => {
      stop();
      if (!visible || document.hidden) return;
      const current = generation;
      video.src = clips[clipIndex]; video.load();
      requestAnimationFrame(() => requestAnimationFrame(() => { if (current === generation) box.classList.add("is-revealing"); }));
      timer = setTimeout(() => {
        if (current !== generation || !visible || document.hidden) return;
        video.play().then(() => {
          if (current === generation && visible && !document.hidden) box.classList.add("is-playing"); else video.pause();
        }).catch(() => {});
      }, 1700);
    };
    const ended = () => { clipIndex = (clipIndex + 1) % clips.length; start(); };
    const visibility = () => { if (document.hidden) stop(); else if (visible) start(); };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) start(); else stop(); }, { threshold: 0.25 });
    video.addEventListener("ended", ended); document.addEventListener("visibilitychange", visibility); observer.observe(box);
    return () => { observer.disconnect(); video.removeEventListener("ended", ended); document.removeEventListener("visibilitychange", visibility); stop(); };
  }, []);
  return <section className="house-section" id="дом-по-эскизу"><div className="house-wrap studio-house"><div>
    <p className="house-eyebrow">Дом по вашему эскизу</p>
    <h2>Нарисовали дом на бумаге?<br />Помогу увидеть его до начала строительства.</h2>
    <p>Работа напрямую с частным специалистом. Можно начать с небольшого эскизного задания, без заказа полного проекта.</p>
    <p>Пришлите рисунок от руки — даже на простом листе бумаги. По вашему эскизу подготовлю то, что нужно именно вам: план и чертежи в 2D, объёмную 3D-модель, изображение дома с ландшафтом или визуализацию отдельных решений. Можно заказать только красивый 3D-эскиз либо обсудить более подробную проработку конструкций и документации. Состав и формат результата согласуем заранее.</p>
    <ol className="studio-process">{["Рисунок от руки", "Планировка", "3D-модель", "Визуализация", "Видеопрезентация", "Ландшафт и благоустройство"].map(x => <li key={x}>{x}</li>)}</ol>
    <a className="house-button" href="#контакты">Обсудить мой эскиз <span aria-hidden="true">↗</span></a>
  </div><div className="studio-video" ref={container}>
    <video muted playsInline preload="none" aria-label="От эскиза дома к трёхмерной модели и визуализации"><source src="./videos/house-sketch-web.mp4" type="video/mp4" /></video>
    <div className="studio-video-copy"><h3 aria-label="От эскиза к объёмной идее"><span aria-hidden="true" data-video-title>{Array.from("От эскиза к объёмной идее").map((letter, i) => <span key={i} style={{ animationDelay: `${i * 35}ms` }}>{letter}</span>)}</span></h3><p>Эскизы и визуализации помогают обсудить замысел. Рабочую проектную документацию согласуем отдельным заданием.</p></div>
  </div></div></section>;
}
