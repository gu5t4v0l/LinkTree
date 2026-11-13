import type { CSSProperties } from "react";
import { CopyEmail } from "./components/CopyEmail";
import { QuoteSheet } from "./components/QuoteSheet";
import {
  CONTACT_EMAIL,
  LINKS,
  SITE_LABEL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "./data/links";
import styles from "./page.module.css";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;
const pad = (n: number) => String(n).padStart(2, "0");

// 01 é o orçamento; os links seguem a partir de 02
const TOTAL = pad(LINKS.length + 1);

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.top} style={delay(0)}>
        <span>Limaware</span>
        <span>Índice / {TOTAL}</span>
      </header>

      <section className={styles.hero} style={delay(1)}>
        <h1 className={styles.wordmark}>
          limaware<span className={styles.square} aria-hidden="true" />
        </h1>
        <p className={styles.tagline}>Sites, apps e sistemas sob medida.</p>
      </section>

      <ol className={styles.list}>
        <li className={styles.item} style={delay(2)}>
          <QuoteSheet index="01" />
        </li>

        {LINKS.map((link, i) => (
          <li
            key={link.id}
            className={`${styles.item} ${styles.rowItem}`}
            style={delay(i + 3)}
          >
            {link.extra && (
              <p className={styles.groupLabel}>Extra</p>
            )}
            <a
              className={`${styles.row} ${link.extra ? styles.compact : ""}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.num} aria-hidden="true">{pad(i + 2)}</span>
              <span className={styles.body}>
                {link.extra ? (
                  <>
                    <span className={styles.title}>{link.title}</span>
                    <span className={styles.meta}>
                      <i className={link.icon} aria-hidden="true" />
                      {link.meta}
                      {link.status && (
                        <>
                          <span aria-hidden="true">{" · "}</span>
                          <span className={styles.status}>
                            <span className={styles.statusDot} aria-hidden="true" />
                            {link.status}
                          </span>
                        </>
                      )}
                    </span>
                  </>
                ) : (
                  <>
                    <span className={styles.meta} aria-hidden="true">
                      <i className={link.icon} />
                      {link.meta}
                    </span>
                    <span className={styles.title}>{link.title}</span>
                    {link.description && (
                      <span className={styles.desc}>{link.description}</span>
                    )}
                  </>
                )}
                <span className="sr-only">(abre em nova aba)</span>
              </span>
              <i className={`ri-arrow-right-up-line ${styles.arrow}`} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>

      <footer className={styles.footer} style={delay(LINKS.length + 3)}>
        <p className={styles.groupLabel}>Falar direto</p>
        <ul className={styles.contacts}>
          <li>
            <a
              className={`${styles.row} ${styles.line}`}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={`ri-whatsapp-line ${styles.lineIcon}`} aria-hidden="true" />
              <span className={styles.lineText}>
                <span className={styles.tabular}>{WHATSAPP_DISPLAY}</span>
                <span className="sr-only"> (abre em nova aba)</span>
              </span>
              <i className={`ri-arrow-right-up-line ${styles.arrow}`} aria-hidden="true" />
            </a>
          </li>
          <li className={styles.lineSplit}>
            <a className={`${styles.row} ${styles.line}`} href={`mailto:${CONTACT_EMAIL}`}>
              <i className={`ri-mail-line ${styles.lineIcon}`} aria-hidden="true" />
              <span className={styles.lineText}>{CONTACT_EMAIL}</span>
            </a>
            <CopyEmail email={CONTACT_EMAIL} />
          </li>
        </ul>
        <p className={styles.sign}>
          {SITE_LABEL}
          <span className={styles.signSquare} aria-hidden="true" />© 2026
        </p>
      </footer>
    </main>
  );
}
