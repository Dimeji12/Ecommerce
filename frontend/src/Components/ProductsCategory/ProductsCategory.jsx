import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// import { productsData } from "src/Data/productsData";
import ProductCard from "../Shared/ProductsCards/ProductCard/ProductCard";
import s from "./ProductsCategory.module.scss";
import {useEffect, useState} from "react";
import {apiUrl} from "../../Data/BaseApi.js";

const ProductsCategory = ({ categoryName, customization }) =>
{

    const [products, setProducts] = useState([]);
    const { t } = useTranslation();
    const categoryProducts = products.filter(
        (product) => product.category === categoryName
    );
    const hasNoProducts = categoryProducts.length === 0;

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

  if (hasNoProducts)
    return (
      <div className={s.notFoundMessage}>
        <p>{t("common.weDontHaveProducts")}</p>
        <p>
          {t("common.backTo")} <Link to="/">{t("common.home")}</Link>
        </p>
      </div>
    );

  return (
    <div className={s.products}>
      {categoryProducts?.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          customization={customization}
        />
      ))}
    </div>
  );
};
export default ProductsCategory;
