import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import CustomNumberInput from "../../Shared/MiniComponents/CustomNumberInput/CustomNumberInput";
import s from "./CartProduct.module.scss";
import RemoveCartProductBtn from "./RemoveCartProductBtn";
import { useState, useEffect } from "react";
import { apiUrl } from "../../../Data/BaseApi.js";


const CartProduct = ({ data }) =>
{
  const { img, name, shortName, afterDiscount, quantity, id, price, discount } = data || {};

  const thePrice = discount == null || discount > price ? price : (price - discount).toFixed(2);

  // Safeguard for `afterDiscount` and handle any undefined or null values
  const priceAfterDiscount = parseFloat((afterDiscount || "0").replaceAll(",", ""));
  const subTotal = (quantity * thePrice).toFixed(2);
  const [productImage, setProductImage] = useState();

  const { t } = useTranslation();

  const translatedProductName = translateProduct({
    productName: shortName,
    translateMethod: t,
    translateKey: "shortName",
  });




  useEffect(() =>
  {
    async function fetchProductImage()
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
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setProductImage(imageObjectURL);
          console.log("Image fetch successful for product ID:", id);
        } catch (error)
        {
          console.error('Error fetching image:', error.message);
        }
      }
    }

    fetchProductImage().catch(err =>
    {
      console.log("Fetch failed:", err);
    });
  }, [id]);

  return (
    <tr className={s.productContainer}>
      <td className={s.product}>
        <div className={s.imgHolder}>
          <img src={productImage} alt={shortName} />
          <RemoveCartProductBtn productId={id} />
        </div>
        <Link to={`/details?product=${name}`}>{translatedProductName}</Link>
      </td>

      <td className={s.price}>£{thePrice}</td>

      <td>
        <CustomNumberInput product={data} quantity={quantity} />
      </td>

      <td>£{subTotal}</td>
    </tr>
  );
};

export default CartProduct;

export function translateProduct({
  productName,
  translateMethod,
  translateKey,
  uppercase = false,
  dynamicData = {},
})
{
  const shortNameKey = productName?.replaceAll(" ", "") || "";
  const productTrans = `products.${shortNameKey}`;
  const translateText = translateMethod(
    `${productTrans}.${translateKey}`,
    dynamicData
  );
  return uppercase ? translateText.toUpperCase() : translateText;
}
