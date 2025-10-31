// Faq.jsx
import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TbTriangleFilled } from "react-icons/tb";
import bruno from "../../Assets/bruno_mobile.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import styles from "./faq.module.css";

export const Faq = () => {
  const { t } = useTranslation();

  const faqs = useMemo(() => {
    let obj = t("faq", { returnObjects: true });
    if (!obj || typeof obj !== "object") obj = {};
    return Object.entries(obj)
      .sort(([a], [b]) => {
        const na = parseInt(String(a).replace(/\D/g, ""), 10) || 0;
        const nb = parseInt(String(b).replace(/\D/g, ""), 10) || 0;
        return na - nb;
      })
      .map(([key, item]) => ({
        key,
        q: item?.question ?? "",
        a: item?.answer ?? "",
      }))
      .filter((it) => it.q);
  }, [t]);

  const firstWithAnswer = useMemo(
    () => faqs.findIndex((f) => f.a && f.a.trim().length),
    [faqs]
  );

  const [openIndex, setOpenIndex] = useState(firstWithAnswer);
  useEffect(() => {
    setOpenIndex(firstWithAnswer);
  }, [firstWithAnswer]);

  const isOpen = (i) => openIndex === i;
  const toggle = (i) => {
    if (!faqs[i]?.a) return;
    setOpenIndex((curr) => (curr === i ? -1 : i));
  };

  return (
    <section id="faq" className={styles.wrapper}>
      {/* HEADER */}
      <header className={styles.headerWrap}>
        <div className={styles.headerTabs}>
          <button className={`${styles.headerTab} ${styles.headerTabActive}`}>
            FAQ
          </button>
          <span className={styles.caret} aria-hidden>
            <TbTriangleFilled />
          </span>
          <div className={styles.headerRail} />
        </div>
      </header>

      {/* LISTA */}
      {faqs.map((item, i) => {
        const open = isOpen(i);
        const num = String(i + 1).padStart(2, "0");
        const hasAnswer = !!item.a;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-trigger-${i}`;

        return (
          <section key={item.key} className={styles.item} data-open={open}>
            <button
              className={styles.trigger}
              id={btnId}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              aria-disabled={!hasAnswer}
              onClick={() => toggle(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(i);
                }
              }}
            >
              <span className={styles.number}>{num}</span>
              <span className={styles.question}>{item.q}</span>
              <i className={styles.chevron} aria-hidden />
            </button>

            {hasAnswer && (
              <div
                className={styles.collapse}
                data-open={open}
                id={panelId}
                role="region"
                aria-labelledby={btnId}
              >
                <div>
                  <p className={styles.answer}>
                    {item.a.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < item.a.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            )}
          </section>
        );
      })}

      <div className={styles.cardDiscordBox}>
        <div className={styles.cardDiscordImg}>
          <img src={bruno} alt="bruno" />
        </div>

        <div className={styles.cardDiscordText}>
          <h1>{t("cardBruno.title")}</h1>
          <p>{t("cardBruno.text")}</p>

          <button
            onClick={() =>
              window.open(
                "https://discord.com/invite/QvG8d3TEXz",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            {t("cardBruno.btnText")}
            <MdKeyboardArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};
