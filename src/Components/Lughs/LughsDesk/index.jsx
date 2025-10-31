import { useState, useMemo } from "react";
import { FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import * as S from "./styles";

const EASE = [0.22, 1, 0.36, 1];

const leftVariants = {
  hidden: { x: -300, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.5, ease: EASE } },
  exit: { x: -300, opacity: 0, transition: { duration: 0.5, ease: EASE } },
};

const rightVariants = {
  hidden: { x: 300, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.5, ease: EASE } },
  exit: { x: 300, opacity: 0, transition: { duration: 0.5, ease: EASE } },
};

export const LughsDesk = ({
  bg,
  lughs,
  handlePrismatic,
  onSelectLugh
}) => {
  const [selected, setSelected] = useState(0);
  const current = useMemo(() => lughs[selected], [lughs, selected]);

  const handleSelect = (i) => {
    setSelected(i);
    onSelectLugh && onSelectLugh(); // 👈 reseta prismático + bg
  };


  return (
    <S.Wrapper style={{ backgroundImage: `url(${bg})` }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <S.Grid>
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${current.name}`}
              variants={leftVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={{ duration: 0.5, ease: EASE }}
            >
              <S.Left>
                <S.Badges>
                  <img src={current.typeIcon} alt="" />
                  <span>{current.number}</span>
                  <FaChevronRight size={24} />
                  <span>{current.type}</span>
                  <FaChevronRight size={24} />
                  <img src={current.stars} alt="" />
                </S.Badges>

                <S.Title>{current.name}</S.Title>

                <S.PrismaticBtn onClick={() => handlePrismatic(current.name)}>
                  {current.prismatic ? current.buttonRegular : current.buttonPrismatic }
                </S.PrismaticBtn>

                <S.TextBlock>
                  <p>{current.text}</p>
                  <p>{current.subText}</p>
                </S.TextBlock>

                {/* Dots */}
                <S.Dots>
                  {lughs.map((_, i) => (
                    <button
                      key={i}
                      className={i === selected ? "active" : ""}
                      onClick={() => setSelected(i)}
                      aria-label={`Ir para ${lughs[i].name}`}
                    />
                  ))}
                </S.Dots>
              </S.Left>
            </motion.div>

            <motion.div
              key={`right-${current.name}`}
              variants={rightVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              transition={{ duration: 0.5, ease: EASE }}
            >
              <S.Right>
                <img src={current.image} alt={current.name} />
              </S.Right>
            </motion.div>
          </AnimatePresence>

          <S.Thumbs>
            {lughs.map((l, i) => (
              <button
                key={l.name}
                className={i === selected ? "active" : ""}
                onClick={() => handleSelect(i)}
                aria-label={`Selecionar ${l.name}`}
                title={l.name}
              >
                <img src={i === selected ? l.btnSelection : l.btn} alt={l.name} />
              </button>
            ))}
          </S.Thumbs>
        </S.Grid>
      </motion.div>
    </S.Wrapper>
  );
};
