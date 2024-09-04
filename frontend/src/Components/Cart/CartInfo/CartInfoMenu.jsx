import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showAlert } from "src/Features/globalSlice";
import { getSubTotal } from "src/Functions/helper";
import s from "./CartInfoMenu.module.scss";

const CartInfoMenu = () => {
  const { cartProducts } = useSelector((state) => state.products);
  const subTotal = getSubTotal(cartProducts); //This caculates the subtotal 
  const { t } = useTranslation();
  const cartInfo = "cartPage.cartInfoMenu";
  const navigateTo = useNavigate();//This is the react hook for navigating from one page to another
  const dispatch = useDispatch();

  return (
    <div className={s.menu} role="region" aria-labelledby="cart-summary">
      <b>{t(`${cartInfo}.cartTotal`)}</b>

      <div className={s.content}>
        <div className={s.item}>
          <span>{t(`${cartInfo}.subTotal`)}:</span>
          <span aria-label={`Subtotal ${subTotal}`}>£{subTotal}</span>
        </div>

        <div className={s.item}>
          <span>{t(`${cartInfo}.shipping`)}:</span>
          <span aria-label={t(`${cartInfo}.free`)}>
            {t(`${cartInfo}.free`)}
          </span>
        </div>
{/*This is the display of the total and the subtotal on the cart page*/}
        <div className={s.item}>
          <span>{t(`${cartInfo}.total`)}:</span>
          <span aria-label={`Total ${subTotal}`}>£{subTotal}</span>
        </div>
      </div>

{/*This is the button to proceed to the checkout page  */}
      <button
        type="button"
        onClick={() => handleCheckoutBtn(cartProducts, navigateTo, dispatch, t)}
      >
        {t("buttons.processToCheckout")}
      </button>
    </div>
  );
};
export default CartInfoMenu;

function handleCheckoutBtn(cartProducts, navigateTo, dispatch, t) {
  const isThereAnyCartItem = cartProducts.length > 0;
//This is an if statement to navigate to the checkout page  and an else block to display an alert 
//if the cart in the cart page is empty 
  if (isThereAnyCartItem) navigateTo("/checkout");
  else showEmptyCartAlert(dispatch, t);
}

// This the function that  displays the alert for empty cart and is called above in the handlecheckout
// button else block 
function showEmptyCartAlert(dispatch, t) {
  const alertText = t("toastAlert.cartEmpty");
  const alertState = "warning";
  dispatch(showAlert({ alertText, alertState }));
}
