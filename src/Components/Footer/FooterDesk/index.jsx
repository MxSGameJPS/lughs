import React from "react";
import { useTranslation } from "react-i18next";
import bruno from "../../../Assets/bruno.png";
import { FaDiscord } from "react-icons/fa";
import instagram from "../../../Assets/Instagram_azul.png";
import youtube from "../../../Assets/Youtube_azul.png";
import discord from "../../../Assets/Discord_azul.png";
import logoAzul from "../../../Assets/logo_azul.png";
import iconBtn from "../../../Assets/icon_btn_azul.png";
import { MdOutlineMail } from "react-icons/md";
import lughsoft from "../../../Assets/lughsoft_azul.png";
import geek from "../../../Assets/geekz.png";
import styles from "./footerDesk.module.css";

export const FooterDesk = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.upper}>
        <div className={styles.cardDiscordText}>
          <h1>{t("cardBruno.title")}</h1>
          <p>{t("cardBruno.text")}</p>

          <a
            className={styles.discordLink}
            href="https://discord.gg/lugh-world-911302214998446111"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord size={39} />
            {t("cardBruno.btnText")}
          </a>
        </div>

        <img src={bruno} alt="" />
      </div>

      <div className={styles.lower}>
        <div className={styles.lowerContentBox}>
          <div className={styles.lowerContent}>
            <img className={styles.logoAzul} src={logoAzul} alt="logoAzul" />

            <button
              className={styles.wishBtn}
              type="button"
              onClick={() =>
                window.open(
                  "https://store.steampowered.com/app/3234720/Lugh_World/",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <img src={iconBtn} alt="" />
              {t("buttons.wishlist")}
            </button>

            <div className={styles.socialRow}>
              <h2 className={styles.title}>{t("footer.socials")}</h2>
              <button
                className={styles.iconButton}
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

              <button
                className={styles.iconButton}
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

              <button
                className={styles.iconButton}
                onClick={() =>
                  window.open(
                    "https://discord.gg/lugh-world-911302214998446111",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <img src={discord} alt="instagram" />
              </button>
            </div>
          </div>

          <div className={styles.lowerContent}>
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

            <div className={styles.contactButton}>
              <MdOutlineMail size={24} />
              contact@lughworld.com
            </div>
          </div>

          <div className={styles.lowerContent}>
            <div className={styles.copyBar}>
              © 2025 Lughsoft Informática LTDA. Todos os direitos reservados.
            </div>

            <div className={styles.logosRow}>
              <img
                className={styles.logoBox}
                src={lughsoft}
                alt="logo lughsoft"
              />
              <img
                className={styles.logoBox}
                src={geek}
                alt="logo geekz"
                style={{ width: "200px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
