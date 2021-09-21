//CORE
import { FC } from "react"
import { Redirect } from "react-router"
//STYLES
import lm from "./Login.module.css"
//COMPONENTS
import LoginReduxForm from "./LoginReduxForm"

type LoginT = {
  captchaUrl: string | null
  isAuth: boolean

  login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
  logout: () => void
}
type LoginFormValueT = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

const Login: FC<LoginT> = ({ isAuth, captchaUrl, login, logout }) => {
  const onSubmit = (formData: LoginFormValueT) => {
    login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div className={lm.header}>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  )
}

export default Login;
