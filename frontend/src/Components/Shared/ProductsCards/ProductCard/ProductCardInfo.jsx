import { useTranslation } from "react-i18next";
import { translateProduct } from "../../../Cart/CartProducts/CartProduct";
import RateStars from "../../MidComponents/RateStars/RateStars";
import ProductColors from "../../MiniComponents/ProductColors/ProductColors";
import s from "./ProductCardInfo.module.scss";

const ProductCardInfo = ({ product, showColors, navigateToProductDetails }) =>
{
    const { shortName, price, discount, afterDiscount, rate, votes, colors } = product;
    const { t } = useTranslation();

    const translatedProductName = translateProduct({
        productName: shortName,
        translateMethod: t,
        translateKey: "shortName",
    });

    // Ensure price is a number before using toFixed
    const formattedPrice = parseFloat(price);
    const formattedDiscountPrice = parseFloat(price - discount);

    return (
        <section className={s.productInfo}>
            <strong className={s.productName}>
                <a href="#" onClick={() => navigateToProductDetails()}>
                    {translatedProductName || shortName}
                </a>
            </strong>

            <div className={s.price}>
                {discount > 0 && discount < price ? (
                    <>
                        £{!isNaN(formattedDiscountPrice) ? formattedDiscountPrice.toFixed(2) : "N/A"}
                        <del className={s.afterDiscount}>
                            £{!isNaN(formattedPrice) ? formattedPrice.toFixed(2) : "N/A"}
                        </del>
                    </>
                ) : (
                    <>
                        £{!isNaN(formattedPrice) ? formattedPrice.toFixed(2) : "N/A"}
                    </>
                )}
            </div>

            <div className={s.rateContainer}>
                <RateStars rate={rate} />
                <span className={s.numOfVotes}>({votes})</span>
            </div>

            {showColors && (
                <div className={s.colors}>
                    <ProductColors colors={colors} />
                </div>
            )}
        </section>
    );
};

export default ProductCardInfo;
