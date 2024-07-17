import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import FeaturedSectionFeatures from '../Home/FeaturedSection/FeaturedSectionFeatures';
import PagesHistory from '../Shared/MiniComponents/PagesHistory/PagesHistory';
import s from './About.module.scss';
import AboutHeroSection from './HeroSection/AboutHeroSection';
import AboutInfoCards from './InfoCards/AboutInfoCards';

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>About</title>
        <meta
          name="description"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, modi aspernatur. Odio, dolor error provident iste quis dolorem fugiat placeat."
        />
      </Helmet>

      <main className={s.aboutPage}>
        <div className="container">
          <PagesHistory history={['/', t('nav.about')]} />
        </div>

        <div className={s.container} id="about-page">
          <AboutHeroSection />
        </div>

        <div className="container">
          <AboutInfoCards />
          {/* <OurMembersSection /> */}
          <FeaturedSectionFeatures />
        </div>
      </main>
    </>
  );
};
export default About;
