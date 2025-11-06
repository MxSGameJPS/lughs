import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LughsMobile } from "./LughsMobile";
import { LughsDesk } from "./LughsDesk";

import bgRegular from "../../Assets/bg_lughs.png";
import bgPrismatic from "../../Assets/bg_lughs_prismatico.png";

import anky from "../../Assets/Anky.png";
import ankyPrismatic from "../../Assets/Anky_prismatico.png";
import araupi from "../../Assets/araupi.png";
import araupiPrismatic from "../../Assets/araupi_prismatico.png";
import choriblob from "../../Assets/ChoriblobRegular.PNG";
import choriblobPrismatic from "../../Assets/ChoriblobPrism.PNG";
import onthera from "../../Assets/OntheraRegular.PNG";
import ontheraPrismatic from "../../Assets/onthera_prismatico.PNG";

import estrelasAnky from "../../Assets/estrelas_anky.png";
import estrelasAraupi from "../../Assets/estrelas_araupi.png";
import estrelas from "../../Assets/5estrelas.png";
import iconGrass from "../../Assets/icon_grass.png";
import iconVoador from "../../Assets/icon_voador.png";
import iconFire from "../../Assets/icon_fire.png";
import iconWhater from "../../Assets/icon_whater.png";

import btnAnky from "../../Assets/btn_anky.png";
import btnAnkySelection from "../../Assets/btn_anky_selecionado.png";
import btnAnkyPrismaticSelection from "../../Assets/btn_anky_prismatico_selecionado.png";
import btnAraupi from "../../Assets/btn_araupi.png";
import btnAraupiSelection from "../../Assets/btn_araupi_selecionado.png";
import btnAraupiPrismaticSelection from "../../Assets/btn_araupi_prismatico_selecionado.png";
import btnChoriblob from "../../Assets/btn_choriblob.png";
import btnChoriblobSelection from "../../Assets/btn_choriblob_selecionado.png";
import btnChoriblobPrismaticSelection from "../../Assets/btn_choriblob_prismatico_selecionado.png";
import btnOnthera from "../../Assets/btn_onthera.png";
import btnOntheraSelection from "../../Assets/btn_onthera_selecionado.png";
import btnOntheraPrismaticSelection from "../../Assets/btn_onthera_prismatico_selecionado.png";
import { DownBtn } from "../DownBtn";

export const Lughs = () => {
  const [prismaticById, setPrismaticById] = useState({
    ANKY: false,
    ARAUPI: false,
    CHORIBLOB: false,
    ONTHERA: false,
  });

  const [prismaticBg, setPrismaticBg] = useState(false);
  const { t } = useTranslation();

  const lughs = [
    {
      name: "ONTHERA",
      number: "#007",
      type: "Fire",
      typeIcon: iconFire,
      stars: prismaticById.ONTHERA ? estrelas : estrelasAnky,
      text: t("lughs.onthera.text"),
      subText: t("lughs.onthera.subText"),
      image: prismaticById.ONTHERA ? ontheraPrismatic : onthera,
      prismatic: prismaticById.ONTHERA,
      buttonRegular: t("buttons.regular"),
      buttonPrismatic: t("buttons.prismatic"),
      btn: btnOnthera,
      // >>> aqui estava usando ["ANKY"] por engano
      btnSelection: prismaticById.ONTHERA
        ? btnOntheraPrismaticSelection
        : btnOntheraSelection,
    },
    {
      name: "ANKY",
      number: "#004",
      type: "Grass",
      typeIcon: iconGrass,
      // mostra as estrelas prismáticas quando a versão prismática estiver ativada
      stars: prismaticById.ANKY ? estrelas : estrelasAnky,
      text: t("lughs.anky.text"),
      subText: t("lughs.anky.subText"),
      image: prismaticById.ANKY ? ankyPrismatic : anky,
      prismatic: prismaticById.ANKY,
      buttonRegular: t("buttons.regular"),
      buttonPrismatic: t("buttons.prismatic"),
      btn: btnAnky,
      btnSelection: prismaticById.ANKY
        ? btnAnkyPrismaticSelection
        : btnAnkySelection,
    },
    {
      name: "ARAUPI",
      number: "#016",
      type: "Voador",
      typeIcon: iconVoador,
      stars: prismaticById.ARAUPI ? estrelasAnky : estrelasAraupi,
      text: t("lughs.araupi.text"),
      subText: t("lughs.araupi.subText"),
      image: prismaticById.ARAUPI ? araupiPrismatic : araupi,
      prismatic: prismaticById.ARAUPI,
      buttonRegular: t("buttons.regular"),
      buttonPrismatic: t("buttons.prismatic"),
      btn: btnAraupi,
      // >>> aqui estava usando ["ANKY"] por engano
      btnSelection: prismaticById.ARAUPI
        ? btnAraupiPrismaticSelection
        : btnAraupiSelection,
    },
    {
      name: "CHORIBLOB",
      number: "#001",
      type: "Whater",
      typeIcon: iconWhater,
      // CHORIBLOB usa `estrelas` quando prismático, caso contrário mantém a imagem regular
      stars: prismaticById.CHORIBLOB ? estrelas : estrelasAnky,
      text: t("lughs.choriblob.text"),
      subText: t("lughs.choriblob.subText"),
      image: prismaticById.CHORIBLOB ? choriblobPrismatic : choriblob,
      prismatic: prismaticById.CHORIBLOB,
      starsPrismatic: estrelas,
      buttonRegular: t("buttons.regular"),
      buttonPrismatic: t("buttons.prismatic"),
      btn: btnChoriblob,
      // >>> aqui estava usando ["ANKY"] por engano
      btnSelection: prismaticById.CHORIBLOB
        ? btnChoriblobPrismaticSelection
        : btnChoriblobSelection,
    },    
  ];

  const handlePrismatic = (name) => {
    const key = String(name).toUpperCase();
    setPrismaticBg((p) => !p);
    setPrismaticById((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const resetPrismaticAll = () => {
    setPrismaticBg(false);
    setPrismaticById((prev) => {
      // zera todos os ids existentes sem hardcode
      const next = {};
      Object.keys(prev).forEach((k) => {
        next[k] = false;
      });
      return next;
    });
  };

  return (
    <div
      id="lughs"
      style={{
        position: "relative",
      }}
    >
      <LughsMobile
        bg={prismaticBg ? bgPrismatic : bgRegular}
        handlePrismatic={handlePrismatic}
        lughs={lughs}
        onSelectLugh={resetPrismaticAll}
      />

      <LughsDesk
        bg={prismaticBg ? bgPrismatic : bgRegular}
        lughs={lughs}
        handlePrismatic={handlePrismatic}
        onSelectLugh={resetPrismaticAll}
      />

      <div
        style={{
          position: "absolute",
          bottom: "24px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <DownBtn destination="gallery" />
      </div>
    </div>
  );
};
