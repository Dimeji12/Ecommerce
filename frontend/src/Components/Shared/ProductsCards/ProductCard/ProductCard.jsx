import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkDateBeforeMonthToPresent } from "src/Functions/helper";
import AddToCartButton from "./AddToCartButton";
import s from "./ProductCard.module.scss";
import ProductCardIcons from "./ProductCardIcons";
import ProductCardInfo from "./ProductCardInfo";
import {useEffect, useState} from "react";
import {apiUrl} from "../../../../Data/BaseApi.js";

//TODO: Note that product card image is loaded here /Components/Shared/ProductsCards/ProductCard/ProductCard.jsx
const ProductCard = ({
  product,
  customization = {
    stopHover: false,
    showDiscount: true,
    showFavIcon: true,
    showDetailsIcon: true,
    showRemoveIcon: false,
    showNewText: false,
    showWishList: true,
    showColors: false,
  },
  removeFrom,
}) =>
{
  const { name, discount, img, id, addedDate } = product;
  const {
    stopHover,
    showDiscount,
    showNewText,
    showFavIcon,
    showDetailsIcon,
    showRemoveIcon,
    showWishList,
    showColors,
  } = customization;
  const noHoverClass = stopHover ? s.noHover : "";
  const hideDiscountClass = discount <= 0 || !showDiscount ? s.hide : "";
  const hideNewClass = shouldHideNewWord();
  const { loadingProductDetails } = useSelector((state) => state.global);
  const navigateTo = useNavigate();
  const iconsData = {
    showFavIcon,
    showDetailsIcon,
    showRemoveIcon,
    showWishList,
  };
  const [productImage, setProductImage] = useState();
  function shouldHideNewWord()
  {
    return checkDateBeforeMonthToPresent(addedDate) || !showNewText
      ? s.hide
      : "";
  }

  function navigateToProductDetails()
  {
    if (loadingProductDetails) return;
    navigateTo(`/details?product=${name.toLowerCase()}`);
  }

  useEffect(() => {
    async function fetchProductImage() {
      if (id != null) {
        const baseUrl = `${apiUrl}imagedata/product/${id}/main-image`;

        try {
          const response = await fetch(baseUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const imageBlob = await response.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setProductImage(imageObjectURL);
        } catch (error) {
          console.error('Error fetching image:', error.message);
        }
      }
    }

    fetchProductImage().catch(err => {
      console.log("Fetch failed:", err);
    });
  }, [id]);

  return (
    <div className={`${s.card} ${noHoverClass}`}>
      <div className={s.productImg}>
        <div className={s.imgHolder}>
          <img
            src={productImage}
            alt={name}
            aria-label={name}
            onClick={navigateToProductDetails}
          />
        </div>

        <div className={s.layerContent}>
          {hideNewClass && (
            <div className={`${s.discount} ${hideDiscountClass}`}>
              -{discount}%
            </div>
          )}

          <div className={`${s.new} ${hideNewClass}`}>New</div>

          <ProductCardIcons
            iconsData={iconsData}
            productId={id}
            navigateToProductDetails={navigateToProductDetails}
            product={product}
            removeFrom={removeFrom}
          />
          <AddToCartButton hoverDataAttribute={true} product={product} />
        </div>
      </div>

      <ProductCardInfo
        product={product}
        showColors={false}
        navigateToProductDetails={navigateToProductDetails}
      />
    </div>
  );
};
export default ProductCard;
