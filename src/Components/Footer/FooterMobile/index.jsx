import React from "react";
import { useTranslation } from "react-i18next";
import { WishBtn } from "../../WishBtn";
import { MdOutlineMail } from "react-icons/md";
import LanguageSwitcher from "../../LanguageSwitcher";
import instagram from "../../../Assets/Instagram.png";
import youtube from "../../../Assets/Youtube.png";
import discord from "../../../Assets/Discord.png";
import lughsoft from "../../../Assets/lughsoft.png";
import geek from "../../../Assets/geekz.png";
import styles from "./footerMobile.module.css";

export const FooterMobile = () => {
  const { t } = useTranslation();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t("footer.socials")}</h2>

        <div className={styles.socialRow}>
          <button className={styles.iconButton}
           onClick={() =>
              window.open(
                "https://www.instagram.com/lughworld/",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <img src={instagram} alt="instagram" />
          </button>

          <button className={styles.iconButton}
           onClick={() =>
              window.open(
                "https://www.youtube.com/@LughWorld/featured",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <img src={youtube} alt="instagram" />
          </button>

          <button className={styles.iconButton}
           onClick={() =>
              window.open(
                "https://discord.gg/hXtfpeYm",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <img src={discord} alt="instagram" />
          </button>
        </div>

        <WishBtn />

        <div className={styles.langRow}>
          <span>{t("footer.language")}</span>
          <LanguageSwitcher />
        </div>

        <div className={styles.linksGrid}>
          <div>
            <button onClick={() => scrollToSection("home")}>
              {t("menu.home")}
            </button>

            <button onClick={() => scrollToSection("about")}>
              {t("menu.about")}
            </button>

            <button onClick={() => scrollToSection("lughs")}>
              {t("menu.lughs")}
            </button>
          </div>

          <div>
            <button onClick={() => scrollToSection("gallery")}>
              {t("menu.gallery")}
            </button>

            <button onClick={() => scrollToSection("video")}>
              {t("menu.video")}
            </button>

            <button onClick={() => scrollToSection("faq")}>
              {t("menu.faq")}
            </button>
          </div>
        </div>

        <div className={styles.contactButton}>
          <MdOutlineMail size={24} />
          contact@lughworld.com
        </div>

        <p className={styles.companyInfo}>
          {t("footer.address")
            .split("\n\n")
            .map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                <br />
              </React.Fragment>
            ))}
        </p>

        <div className={styles.logosRow}>
          <img className={styles.logoBox} src={lughsoft} alt="logo lughsoft" />
          <img className={styles.logoBox} src={geek} alt="logo geekz" />
        </div>

        <div className={styles.copyBar}>
          © 2025 Lughsoft Informática LTDA. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};
