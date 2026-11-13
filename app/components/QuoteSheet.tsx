"use client";

import {
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import {
  QUOTE_BUDGETS,
  QUOTE_BUDGET_DEFAULT,
  QUOTE_SERVICES,
  buildQuoteUrl,
  type QuoteData,
} from "../data/links";
import styles from "./QuoteSheet.module.css";

const INITIAL: QuoteData = {
  name: "",
  company: "",
  service: QUOTE_SERVICES[0],
  budget: QUOTE_BUDGET_DEFAULT,
};

// gesto de arrastar para fechar (só na folha inferior, celular)
const SWIPE_CLOSE_DISTANCE = 96; // px
const SWIPE_CLOSE_VELOCITY = 0.5; // px/ms
const SWIPE_MIN_FLICK = 24; // px
const DESKTOP_QUERY = "(min-width: 40rem)";

type Drag = { id: number; startY: number; startT: number; dy: number };

export function QuoteSheet({ index }: { index: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const drag = useRef<Drag | null>(null);
  const [data, setData] = useState<QuoteData>(INITIAL);

  const titleRef = useRef<HTMLHeadingElement>(null);

  const open = () => {
    dialogRef.current?.showModal();
    titleRef.current?.focus();
  };
  const close = () => dialogRef.current?.close();

  // clique no fundo escuro fecha
  const onBackdrop = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) close();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const url = buildQuoteUrl(data);
    close();
    // window.open é bloqueado no navegador interno do Instagram
    window.location.href = url;
  };

  const set = <K extends keyof QuoteData>(key: K, value: QuoteData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  /* ---------- arrastar para fechar ---------- */
  const onDragStart = (e: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia(DESKTOP_QUERY).matches) return;
    if ((e.target as HTMLElement).closest("button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id: e.pointerId, startY: e.clientY, startT: e.timeStamp, dy: 0 };
  };

  const onDragMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const sheet = dialogRef.current;
    if (!d || d.id !== e.pointerId || !sheet) return;
    d.dy = Math.max(0, e.clientY - d.startY);
    sheet.style.transition = "none";
    sheet.style.transform = `translateY(${d.dy}px)`;
  };

  const onDragEnd = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const sheet = dialogRef.current;
    if (!d || d.id !== e.pointerId || !sheet) return;
    drag.current = null;
    const velocity = d.dy / Math.max(1, e.timeStamp - d.startT);
    // limpar o estilo inline devolve a transição do CSS a partir da posição atual
    sheet.style.removeProperty("transition");
    sheet.style.removeProperty("transform");
    if (
      d.dy > SWIPE_CLOSE_DISTANCE ||
      (d.dy > SWIPE_MIN_FLICK && velocity > SWIPE_CLOSE_VELOCITY)
    ) {
      close();
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.cta}
        onClick={open}
        aria-haspopup="dialog"
      >
        <span className={styles.ctaNum} aria-hidden="true">{index}</span>
        <span className={styles.ctaArrow} aria-hidden="true">
          <i className="ri-arrow-up-line" />
          <i className="ri-arrow-up-line" />
        </span>
        <span className={styles.ctaTitle}>Pedir um orçamento</span>
        <span className={styles.ctaDesc}>
          Leva menos de um minuto. A resposta vem pelo WhatsApp.
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className={styles.sheet}
        aria-labelledby="quote-title"
        onClick={onBackdrop}
      >
        <form className={styles.form} onSubmit={onSubmit}>
          <div
            className={styles.drag}
            onPointerDown={onDragStart}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            onPointerCancel={onDragEnd}
          >
            <span className={styles.handle} aria-hidden="true" />
            <div className={styles.head}>
              <div>
                <p className={styles.kicker}>Leva menos de um minuto</p>
                <h2
                  id="quote-title"
                  ref={titleRef}
                  tabIndex={-1}
                  className={styles.title}
                >
                  Conta pra gente o que você precisa
                </h2>
              </div>
              <button
                type="button"
                className={styles.close}
                onClick={close}
                aria-label="Fechar"
              >
                <i className="ri-close-line" aria-hidden="true" />
              </button>
            </div>
          </div>

          <label className={styles.field}>
            <span>Seu nome</span>
            <input
              name="name"
              required
              autoComplete="name"
              autoCapitalize="words"
              enterKeyHint="next"
              value={data.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span>
              Empresa <em>opcional</em>
            </span>
            <input
              name="company"
              autoComplete="organization"
              autoCapitalize="words"
              enterKeyHint="next"
              value={data.company}
              onChange={(e) => set("company", e.target.value)}
            />
          </label>

          <fieldset className={styles.field}>
            <legend>O que você precisa</legend>
            <div className={styles.chips}>
              {QUOTE_SERVICES.map((service) => (
                <label key={service} className={styles.chip}>
                  <input
                    type="radio"
                    name="service"
                    value={service}
                    checked={data.service === service}
                    onChange={() => set("service", service)}
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.field}>
            <legend>Faixa de orçamento</legend>
            <div className={styles.chips}>
              {QUOTE_BUDGETS.map((budget) => (
                <label key={budget} className={styles.chip}>
                  <input
                    type="radio"
                    name="budget"
                    value={budget}
                    checked={data.budget === budget}
                    onChange={() => set("budget", budget)}
                  />
                  <span>{budget}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" className={styles.submit}>
            <i className="ri-whatsapp-line" aria-hidden="true" />
            Enviar pelo WhatsApp
            <i className={`ri-arrow-right-line ${styles.submitArrow}`} aria-hidden="true" />
          </button>
        </form>
      </dialog>
    </>
  );
}
