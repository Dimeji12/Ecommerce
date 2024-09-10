import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { translateProduct } from "../../Cart/CartProducts/CartProduct";
import s from "./PaymentProducts.module.scss";
import { useEffect, useState } from "react";
import { apiUrl } from "../../../Data/BaseApi.js";

const PaymentProducts = ({ data }) =>
{
  const { t } = useTranslation();

  // Fetch and set product image based on product id
  const fetchProductImage = async (id) =>
  {
    if (id != null)
    {
      const baseUrl = `${apiUrl}imagedata/product/${id}/main-image`;

      try
      {
        const response = await fetch(baseUrl);
        if (!response.ok)
        {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const imageBlob = await response.blob();
        return URL.createObjectURL(imageBlob);
      } catch (error)
      {
        console.error("Error fetching image:", error.message);
        return null; // Return null if there's an error
      }
    }
    return null;
  };

  return (
    <div className={s.products}>
      {data.map(({ img, name, shortName, afterDiscount, id, quantity, price, discount }) =>
      {
        const thePrice = discount == null || discount > price ? price : (price - discount).toFixed(2);

        const [productImage, setProductImage] = useState(null);

        useEffect(() =>
        {
          const loadImage = async () =>
          {
            const image = await fetchProductImage(id); // Pass the correct product id to fetch the image
            setProductImage(image);
          };

          loadImage();
        }, [id]); // Dependency array includes id to refetch the image if id changes

        return (
          <Link to={`/details?product=${name}`} key={id} className={s.product}>
            <div className={s.wrapper}>
              <img src={productImage} alt={shortName} />
              <span>
                {translateProduct({
                  productName: shortName,
                  translateMethod: t,
                  translateKey: "shortName",
                })}
              </span>
            </div>
            <span className={s.price}>{thePrice * quantity}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default PaymentProducts;