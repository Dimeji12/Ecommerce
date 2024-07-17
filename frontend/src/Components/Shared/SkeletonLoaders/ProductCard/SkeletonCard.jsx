import s from "./SkeletonCard.module.scss";

const SkeletonCard = () => {
  return (
    <div className={s.skeletonCard}>
      <div className={s.imgHolder} />

      <div className={s.productInfo}>
        <div className={s.title} />

        <div className={s.priceContainer}>
          <div className={s.price} />
          <div className={s.afterDiscount} />
        </div>

        <div className={s.rate}>
          <div className={s.star} />
          <div className={s.star} />
          <div className={s.star} />
          <div className={s.star} />
          <div className={s.star} />
        </div>
      </div>
    </div>
  );
};
export default SkeletonCard;
