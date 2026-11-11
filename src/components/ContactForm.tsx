import { useRef, useState, type FormEvent } from "react";
import {
  Send,
  MessageCircleMore,
  Mail,
  Phone,
  MapPin,
  Upload,
  Copy,
  Check,
  X,
  Clock,
  ArrowRight,
} from "lucide-react";
import { SectionHead, Meta } from "../lib/ui";
import { Reveal } from "../lib/motion";
import { publicContacts } from "../lib/public-contacts";

const KINDS = [
  "Чертежи и 3D",
  "Сметы и документы",
  "Сайты и автоматизация",
  "Фасадные системы и остекление",
  "Фото, видео и поздравления",
  "Компьютерный мастер",
  "Мастер на все руки",
  "Другое",
];

const CHANNELS = ["MAX", "Telegram", "ВКонтакте", "Звонок", "E-mail"];
const contactRows = [
  ...publicContacts.map(({ channel, value, href }) => ({
    icon: channel === "Почта" ? Mail : channel === "Телефон" ? Phone : channel === "MAX" ? MessageCircleMore : Send,
    label: channel,
    value,
    href,
  })),
  { icon: MapPin, label: "География", value: "Удалённо — везде; выезд — Санкт-Петербург", href: undefined },
  { icon: Clock, label: "Режим", value: "Разовые задачи и регулярная помощь по расписанию", href: undefined },
];

type Format = "remote" | "visit";

export default function ContactForm() {
  const [kind, setKind] = useState(KINDS[0]);
  const [format, setFormat] = useState<Format>("remote");
  const [district, setDistrict] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [channel, setChannel] = useState(CHANNELS[0]);
  const [contact, setContact] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [draft, setDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const visitLocked = kind === "Мастер на все руки";
  const effectiveFormat: Format = visitLocked ? "visit" : format;

  function onKindChange(value: string) {
    setKind(value);
    if (value === "Мастер на все руки") setFormat("visit");
  }

  function fmtSize(bytes: number) {
    if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} КБ`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (description.trim().length < 10) errs.description = "Опишите задачу хотя бы парой фраз — так я быстрее отвечу по сути.";
    if (contact.trim().length < 3) errs.contact = "Укажите контакт: ник, телефон или почту.";
    if (effectiveFormat === "visit" && district.trim().length < 2) errs.district = "Укажите район Санкт-Петербурга для выезда.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const lines = [
      "ЗАЯВКА · Специалист на час",
      `Вид помощи: ${kind}`,
      `Формат: ${effectiveFormat === "visit" ? `Выезд по СПб, район — ${district.trim()}` : "Удалённо"}`,
      `Описание: ${description.trim()}`,
      deadline.trim() ? `Срок: ${deadline.trim()}` : "Срок: не указан",
      `Связь: ${channel} → ${contact.trim()}`,
      files.length ? `Вложения: ${files.map((f) => f.name).join(", ")}` : "Вложения: нет",
    ];
    setDraft(lines.join("\n"));
    window.setTimeout(() => resultRef.current?.focus(), 60);
  }

  async function copyDraft() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function resetAll() {
    setDraft(null);
    setDescription("");
    setDeadline("");
    setDistrict("");
    setContact("");
    setFiles([]);
    setErrors({});
  }

  const inputCls =
    "w-full border border-line bg-ink-950 px-4 py-3 text-sm text-paper placeholder:text-fog-500 transition-colors focus:border-accent-400/70 focus:outline-none";

  return (
    <section id="контакты" className="relative scroll-mt-20 border-t border-line-soft bg-ink-900/30 py-20 md:py-28" aria-label="Контакты">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          index="04"
          kicker="Контакты"
          title="Обсудить задачу"
          note="Позвоните или напишите в удобном мессенджере."
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div aria-labelledby="direct-contacts-title">
            <h3 id="direct-contacts-title" className="mb-4 font-display text-xl font-semibold text-paper">
              Связаться напрямую
            </h3>
            <div className="space-y-3.5">
              {contactRows.map((c) => {
                const rowClass = "flex min-h-16 items-center gap-3 border px-4 py-3 sm:gap-4 sm:px-5";
                const content = (
                  <>
                    <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center border border-line bg-ink-900 text-accent-400">
                      <span className="contact-icon-motion" data-contact-icon={c.label}>
                        {c.label === "ВКонтакте" ? <span className="font-sans text-sm font-bold tracking-tight">VK</span> : <c.icon className="h-4.5 w-4.5" strokeWidth={1.5} />}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <Meta className="text-fog-300">{c.label}</Meta>
                      <span className={`mt-1 block break-words font-semibold ${c.href ? "text-base text-accent-300" : "text-sm text-paper"}`}>
                        {c.value}
                      </span>
                    </span>
                  </>
                );

                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("https://") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`${rowClass} border-accent-400/45 bg-accent-500/8 transition-colors hover:border-accent-400 hover:bg-accent-500/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400`}
                  >
                    {content}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-accent-300" />
                  </a>
                ) : (
                  <div key={c.label} className={`${rowClass} border-line bg-ink-950/70`}>{content}</div>
                );
              })}
            </div>
          </div>

          {/* форма */}
          <Reveal delay={120}>
            <form onSubmit={submit} aria-labelledby="draft-form-title" className="relative border border-line bg-ink-950/80 p-6 sm:p-8" noValidate={false}>
              <span aria-hidden className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-accent-400" />
              <span aria-hidden className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-accent-400" />
              <h3 id="draft-form-title" className="font-display text-xl font-semibold text-paper">Черновик заявки</h3>
              <p className="mb-6 mt-2 text-sm leading-relaxed text-fog-300">
                Соберите описание задачи, затем скопируйте его и отправьте в мессенджере.
              </p>

              <div className="grid gap-5">
                <div>
                  <label htmlFor="f-kind" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-fog-400">
                    Вид помощи
                  </label>
                  <select id="f-kind" value={kind} onChange={(e) => onKindChange(e.target.value)} className={inputCls}>
                    {KINDS.map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>

                <fieldset disabled={visitLocked}>
                  <legend className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fog-400">
                    Формат {visitLocked ? "· только выезд для этой рубрики" : ""}
                  </legend>
                  <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Формат работы">
                    {(
                      [
                        ["remote", "Удалённо"],
                        ["visit", "Выезд по СПб"],
                      ] as [Format, string][]
                    ).map(([v, label]) => (
                      <button
                        key={v}
                        type="button"
                        role="radio"
                        aria-checked={effectiveFormat === v}
                        onClick={() => setFormat(v)}
                        className={`border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                          effectiveFormat === v
                            ? "border-accent-400 bg-accent-500/12 text-accent-300"
                            : "border-line bg-ink-950 text-fog-400 hover:border-accent-400/40 hover:text-paper"
                        } ${visitLocked ? "opacity-70" : ""}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {effectiveFormat === "visit" && (
                  <div className={visitLocked ? "" : "bp-fade-in"}>
                    <label htmlFor="f-district" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-demo-400">
                      Район Санкт-Петербурга {visitLocked ? "" : "(обязательно при выезде)"}
                    </label>
                    <input
                      id="f-district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="Например: Московский, Приморский, Центральный…"
                      className={`${inputCls} ${errors.district ? "border-demo-400/70" : ""}`}
                      aria-invalid={Boolean(errors.district)}
                    />
                    {errors.district ? <p className="mt-2 text-xs text-demo-400">{errors.district}</p> : null}
                  </div>
                )}

                <div>
                  <label htmlFor="f-desc" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-fog-400">
                    Описание задачи
                  </label>
                  <textarea
                    id="f-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Что есть на входе и что нужно получить. Можно своими словами: «есть фото эскиза кухни с размерами, нужен план для согласования»…"
                    className={`${inputCls} resize-y ${errors.description ? "border-demo-400/70" : ""}`}
                    aria-invalid={Boolean(errors.description)}
                  />
                  {errors.description ? <p className="mt-2 text-xs text-demo-400">{errors.description}</p> : null}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="f-deadline" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-fog-400">
                      Срок
                    </label>
                    <input
                      id="f-deadline"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      placeholder="До пятницы / не горит"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="f-channel" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-fog-400">
                      Способ связи
                    </label>
                    <select id="f-channel" value={channel} onChange={(e) => setChannel(e.target.value)} className={inputCls}>
                      {CHANNELS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="f-contact" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-fog-400">
                    Ваш контакт ({channel})
                  </label>
                  <input
                    id="f-contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={channel === "E-mail" ? "you@example.ru" : channel === "Звонок" ? "+7 ___ ___-__-__" : "ник или телефон"}
                    className={`${inputCls} ${errors.contact ? "border-demo-400/70" : ""}`}
                    aria-invalid={Boolean(errors.contact)}
                  />
                  {errors.contact ? <p className="mt-2 text-xs text-demo-400">{errors.contact}</p> : null}
                </div>

                {/* вложение */}
                <div>
                  <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-fog-400">
                    Вложение · фото эскиза, смета, файл
                  </span>
                  <label
                    htmlFor="f-file"
                    className="flex cursor-pointer items-center justify-center gap-3 border border-dashed border-line bg-ink-900/50 px-4 py-6 text-sm text-fog-400 transition-colors hover:border-accent-400/50 hover:text-accent-300"
                  >
                    <Upload className="h-4.5 w-4.5" />
                    {files.length ? "Добавить ещё файл" : "Добавить название файла в черновик"}
                  </label>
                  <input
                    id="f-file"
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={(e) => {
                      const list = Array.from(e.target.files ?? []);
                      setFiles((prev) => [...prev, ...list].slice(0, 5));
                      e.target.value = "";
                    }}
                  />
                  {files.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {files.map((f, i) => (
                        <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 border border-line-soft bg-ink-900/60 px-3 py-2 font-mono text-[11px] text-fog-300">
                          <span className="truncate">{f.name} · {fmtSize(f.size)}</span>
                          <button
                            type="button"
                            aria-label={`Убрать файл ${f.name}`}
                            onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                            className="shrink-0 text-fog-500 hover:text-demo-400"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="submit"
                  className="group mt-1 inline-flex w-full items-center justify-center gap-3 bg-accent-500 px-7 py-4 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-950 transition-colors hover:bg-accent-300"
                >
                  Подготовить черновик
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </form>

            {/* черновик заявки */}
            {draft && (
              <div
                ref={resultRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="mt-5 border border-accent-400/50 bg-ink-950/90 p-5 outline-none sm:p-6"
              >
                <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-300">
                  <Check className="h-4 w-4" />
                  Черновик заявки готов
                </p>
                <div className="mt-4 border border-line-soft bg-ink-900/70 p-4">
                  <button
                    type="button"
                    onClick={copyDraft}
                    className="ml-auto flex min-h-11 items-center gap-2 border border-accent-400/60 bg-accent-500/12 px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-300 transition-colors hover:bg-accent-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Скопировано" : "Скопировать текст"}
                  </button>
                  <pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap break-words font-mono text-[12px] leading-relaxed text-fog-300">
                    {draft}
                  </pre>
                </div>
                {publicContacts.length > 0 && (
                  <p className="mt-3 text-[13px] leading-relaxed text-fog-400">
                    Отправьте текст в мессенджере и приложите файлы в переписке.
                  </p>
                )}
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={resetAll}
                    className="inline-flex items-center gap-2 border border-line px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fog-400 transition-colors hover:border-demo-400/60 hover:text-demo-400"
                  >
                    <X className="h-4 w-4" />
                    Очистить форму
                  </button>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
