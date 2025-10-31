import { useState } from "react";
import { IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import styles from "./languageSwitcher.module.css";

import pt from "../../Assets/brasil.png";
import en from "../../Assets/eua.png";
import es from "../../Assets/espanha.png";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const current = i18n.resolvedLanguage || i18n.language || "pt";

  const flagByLang = {
    pt,
    en,
    es,
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang) => {
    setAnchorEl(null);
    if (lang) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <>
      <IconButton onClick={handleClick} className={styles.iconButton}>
        <Avatar
          src={flagByLang[current]}
          alt={current.toUpperCase()}
          className={styles.avatar}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        PaperProps={{
          sx: { backgroundColor: "transparent", boxShadow: "none" },
        }}
        MenuListProps={{ sx: { backgroundColor: "transparent" } }}
      >
        <MenuItem onClick={() => handleClose("pt")}>
          <Avatar src={pt} className={styles.avatarSmall} />
        </MenuItem>
        <MenuItem onClick={() => handleClose("en")}>
          <Avatar src={en} className={styles.avatarSmall} />
        </MenuItem>
        <MenuItem onClick={() => handleClose("es")}>
          <Avatar src={es} className={styles.avatarSmall} />
        </MenuItem>
      </Menu>
    </>
  );
}
