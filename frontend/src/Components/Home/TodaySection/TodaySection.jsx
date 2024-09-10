import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { productsData } from "src/Data/productsData";
import ProductsSlider from "../../Shared/MidComponents/ProductsSlider/ProductsSlider";
import SectionTitle from "../../Shared/MiniComponents/SectionTitle/SectionTitle";
import EventCounter from "./EventCounter";
import s from "./TodaySection.module.scss";
import { useState, useEffect } from 'react';
import { apiUrl } from "../../../Data/BaseApi";

const TodaySection = () =>
{

  function filterFlashSalesProducts()
  {
    return products.filter((productData) => productData.sold > 100);
  }

  const [products, setProducts] = useState([])
  useEffect(() =>
  {
    const fetchProducts = async () =>
    {
      try
      {
        const response = await fetch(`${apiUrl}Products`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok)
        {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Fetched Products:", data);
        setProducts(data);
      } catch (error)
      {
        console.error('Error fetching Products:', error);
      }
    };

    fetchProducts();
  }, []);

  const todaysSection = "sectionTitles.todaysSection";
  const { t } = useTranslation();

  return (
    <section className={s.todaysSection} id="todays-section">
      <div className={s.wrapper}>
        <SectionTitle
          eventName={t(`${todaysSection}.title`)}
          sectionName={t(`${todaysSection}.flashSales`)}
        />
        <EventCounter eventName="flash-sales" timeEvent="3 23 19 56" />
      </div>

      <ProductsSlider filterFun={filterFlashSalesProducts} />

      <Link to="/products" className={s.viewProductsBtn}>
        {t("buttons.viewAllProducts")}
      </Link>
    </section>
  );
};
export default TodaySection;

