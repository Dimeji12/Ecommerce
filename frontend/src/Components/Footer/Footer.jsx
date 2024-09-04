import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CopyRightsText from './CopyRightsText/CopyRightsText';
import s from './Footer.module.scss';
import { useSelector } from "react-redux";

const Footer = () => {
  const { t } = useTranslation();
  const { loginInfo } = useSelector((state) => state.user);
  const { username, isSignIn } = loginInfo;
  const section = 'footer.section';

  return (
    <footer className={s.footer}>
      <div className="container">
        <section className={s.sections}>
          <section className={s.section1}>
            <b>
              <Link to="/">Dales</Link>
            </b>
            <ul style={{ paddingLeft: 0 }}>

              <li>
                <a href="mailto:dales@gmail.com">dales@gmail.com</a>
              </li>
              <li>
                <a href="tel:+123456788">+123 456 789</a>
              </li>
            </ul>

          </section>


          <section className={s.section2}>
            <b>{t(`${section}3.account`)}</b>

            <ul style={{ paddingLeft: 0 }}>
              <li>
                <Link to="/profile">{t(`${section}3.myAccount`)}</Link>
              </li>
              {!isSignIn && <li>
                <Link to="/signup">{t(`${section}3.loginRegister`)}</Link>
              </li>}

              <li>
                <Link to="/cart">{t(`${section}3.cart`)}</Link>
              </li>
              <li>
                <Link to="/wishlist">{t(`${section}3.wishlist`)}</Link>
              </li>
              <li>
                <Link to="/products">{t(`${section}3.shop`)}</Link>
              </li>
            </ul>
          </section>

          <section className={s.section4}>
            <b>{t(`${section}4.quickLink`)}</b>

            <ul style={{ paddingLeft: 0 }}>

              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">{t(`${section}4.contact`)}</Link>
              </li>
            </ul>
          </section>


        </section>

        <CopyRightsText />
      </div>

    </footer>
  );
};
export default Footer;
