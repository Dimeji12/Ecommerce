import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { pagesRequireSignIn } from "../Data/globalVariables";
import { showAlert } from "../Features/globalSlice";

const RequiredAuth = ({ children }) => {
  const { loginInfo } = useSelector((state) => state.user);
  const { isSignIn } = loginInfo;
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const pathName = location.pathname;
  const isLoginOrSignUpPage = pathName === "/login" || pathName === "/signup";

  // Check if the current path requires sign-in
  const isPageRequiringSignIn = (page) =>
    pagesRequireSignIn.includes(page) && !isSignIn;

  if (isLoginOrSignUpPage && isSignIn) {
    console.log('User is signed in, redirecting to home page');
    return <Navigate to="/" />;
  }

  if (isPageRequiringSignIn(pathName)) {
    const redirectTo = encodeURIComponent(pathName);
    console.log('Redirecting to login with redirect:', redirectTo);
    loginFirstAlert();
    return <Navigate to={`/login?redirect=${redirectTo}`} />;
  }

  function loginFirstAlert() {
    const alertText = t("toastAlert.pageRequiringSignIn");
    const alertState = "warning";
    setTimeout(() => dispatch(showAlert({ alertText, alertState })), 300);
  }

  return children;
};

export default RequiredAuth;
