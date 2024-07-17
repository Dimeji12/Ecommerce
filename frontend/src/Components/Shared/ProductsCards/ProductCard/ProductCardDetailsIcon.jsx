import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { detailsIconToolTipLeftPos } from "src/Functions/componentsFunctions";
import SvgIcon from "../../MiniComponents/SvgIcon";
import ToolTip from "../../MiniComponents/ToolTip";
import s from "./ProductCardDetailsIcon.module.scss";

const ProductCardDetailsIcon = ({ navigateToProductDetails }) => {
  const { t } = useTranslation();
  const lang = cookies.get("i18next");
  const detailsIconLeftToolTipPos = detailsIconToolTipLeftPos(lang);

  return (
    <Link
      onClick={navigateToProductDetails}
      className={`${s.iconHolder} ${s.detailsIcon}`}
      aria-label={t("productCard.icons.details")}
    >
      <SvgIcon name="eye" />
      <ToolTip
        top="18px"
        left={detailsIconLeftToolTipPos}
        content={t("productCard.icons.details")}
      />
    </Link>
  );
};
export default ProductCardDetailsIcon;
