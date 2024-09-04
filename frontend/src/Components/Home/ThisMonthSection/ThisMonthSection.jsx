import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { productsData } from "src/Data/productsData";
import ProductsSlider from "../../Shared/MidComponents/ProductsSlider/ProductsSlider";
import SectionTitle from "../../Shared/MiniComponents/SectionTitle/SectionTitle";
import s from "./ThisMonthSection.module.scss";
import { useState, useEffect } from 'react';

const ThisMonthSection = () =>
{

  const [products, setProducts] = useState([])
  useEffect(() =>
  {
    const fetchProducts = async () =>
    {
      try
      {
        const response = await fetch('http://localhost:5243/api/Products', {
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


  function filterThisMonthProducts()
  {
    const filteredProducts = products.filter(
      (productData) => productData.sold > 1000
    );

    return filteredProducts;
  }

  const { t } = useTranslation();
  const thisMonthSection = "sectionTitles.thisMonthSection";

  return (
    <section className={s.thisMonthSection}>
      <div className={s.wrapper}>
        <SectionTitle
          eventName={t(`${thisMonthSection}.title`)}
          sectionName={t(`${thisMonthSection}.bestSelling`)}
        />

        <Link to="/products" className={s.viewAllBtn}>
          {t("buttons.viewAll")}
        </Link>
      </div>

      <ProductsSlider filterFun={filterThisMonthProducts} />
    </section>
  );
};
export default ThisMonthSection;


