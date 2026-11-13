"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CopyEmail.module.css";

const RESET_MS = 1600;

type Status = "idle" | "copied" | "failed";

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), RESET_MS);
  };

  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={copy}
        aria-label="Copiar e-mail"
        data-copied={status === "copied" || undefined}
        data-failed={status === "failed" || undefined}
      >
        <i
          className={
            status === "copied"
              ? "ri-check-line"
              : status === "failed"
                ? "ri-error-warning-line"
                : "ri-file-copy-line"
          }
          aria-hidden="true"
        />
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied" && "E-mail copiado"}
        {status === "failed" && "Não deu para copiar. Toque no e-mail para abrir o app."}
      </span>
    </>
  );
}
