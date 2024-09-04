import { useTranslation } from "react-i18next";
import { translateProduct } from "../../../Cart/CartProducts/CartProduct";
import RateStars from "../../../Shared/MidComponents/RateStars/RateStars";
import s from "./ProductFirstInfos.module.scss";

const ProductFirstInfos = ({ data }) =>
{
  const { shortName, price, votes, rate, discount } = data;
  const { t } = useTranslation();

  const translatedProductName = translateProduct({
    productName: shortName,
    translateMethod: t,
    translateKey: "name",
    uppercase: true,
  });

  const translatedDescription = translateProduct({
    productName: shortName,
    translateMethod: t,
    translateKey: "description",
  });

  return (
    <section className={s.firstInfos}>
      <h2 className={s.productName}>{shortName}</h2>

      <div className={s.rateAndReviews}>
        <RateStars rate={rate} />
        <span className={s.reviews}>{t("detailsPage.reviews", { votes })}</span>

        <div className={s.verticalLine} />

        <span className={s.greenText}>{t("detailsPage.inStock")}</span>
      </div>

        <div className={s.price}>
              {discount > 0 && discount < price ? (
                  <>
                      £{(price - discount).toFixed(2)}
                      <div>
                          <del className={s.afterDiscount}>£{price.toFixed(2)}</del>
                      </div>

                  </>
              ) : (
                  <>
                      £{price.toFixed(2)}
                  </>
              )}
          </div>

      <p className={s.description}>{data.description}</p>
    </section>
  );
};
export default ProductFirstInfos;
