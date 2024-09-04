import { Helmet } from 'react-helmet-async';
import { signUpImg } from 'src/Assets/Images/Images';
import useScrollOnMount from 'src/Hooks/App/useScrollOnMount';
import s from './SignUp.module.scss';
import SignUpForm from './SignUpForm/SignUpForm';

const SignUp = () => {
  useScrollOnMount(240);

  return (
    <>
      <Helmet>
        <title>Sign up</title>
        <meta
          name="description"
          content="Create an Dales account to enjoy a personalized shopping experience, track your orders, and manage your preferences easily."
        />
      </Helmet>

      <main className={s.signUpPage} id="signup-page">
        <div className={s.container}>
          <div className={s.imgHolder}>
            <img src={signUpImg} alt="Shopping cart and phone" />
          </div>

          <SignUpForm />
        </div>
      </main>
    </>
  );
};
export default SignUp;
