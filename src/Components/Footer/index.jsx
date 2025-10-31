import { FooterMobile } from "./FooterMobile";
import { FooterDesk } from "./FooterDesk";
import { ScrollTopButton } from "./ScrollTopButton";

export const Footer = () => {
  return (
    <div>
      <FooterMobile />
      <FooterDesk />
      <ScrollTopButton />
    </div>
  );
};
