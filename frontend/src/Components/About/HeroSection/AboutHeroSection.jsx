import { useTranslation } from "react-i18next";
import { aboutUs } from "src/Assets/Images/Images";
import s from "./AboutHeroSection.module.scss";

const AboutHeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className={s.heroSection}>
      <section className={s.content}>
        
        <h2>{t("aboutPage.heroSection.heading")}</h2>

        <p>{t("aboutPage.heroSection.paragraphOne")}</p>
        <p>{t("aboutPage.heroSection.paragraphTwo")}</p>
      </section>

      {/* <div className={s.imgHolder}>
        <img src={aboutUs} alt={t("aboutPage.heroSection.imageAlt")} />
      </div> */}
    </section>

  );
};

export default AboutHeroSection;
