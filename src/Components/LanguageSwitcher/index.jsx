import { useState } from "react";
import { IconButton, Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import styles from "./languageSwitcher.module.css";

import pt from "../../Assets/brasil.png";
import en from "../../Assets/eua.png";
import es from "../../Assets/espanha.png";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [openInline, setOpenInline] = useState(false);

  const current = i18n.resolvedLanguage || i18n.language || "pt";

  const flagByLang = {
    pt,
    en,
    es,
  };

  const handleClick = () => {
    // toggle inline dropdown
    setOpenInline((s) => !s);
  };

  const handleClose = (lang) => {
    setOpenInline(false);
    if (lang) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <>
      <div className={styles.root}>
        <IconButton onClick={handleClick} className={styles.iconButton}>
          <Avatar
            src={flagByLang[current]}
            alt={current.toUpperCase()}
            className={styles.avatar}
          />
        </IconButton>

        {openInline && (
          <div className={styles.dropdown} role="menu">
            <button
              className={styles.dropdownItem}
              onClick={() => handleClose("pt")}
            >
              <Avatar src={pt} className={styles.avatarSmall} />
            </button>
            <button
              className={styles.dropdownItem}
              onClick={() => handleClose("en")}
            >
              <Avatar src={en} className={styles.avatarSmall} />
            </button>
            <button
              className={styles.dropdownItem}
              onClick={() => handleClose("es")}
            >
              <Avatar src={es} className={styles.avatarSmall} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
