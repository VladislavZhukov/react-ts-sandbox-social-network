//CORE
import { FC, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import { login } from "../../redux/auth-reducer"
import { AppStateT } from "../../redux/store-redux"
//STYLES
import lm from "./Login.module.css"
//COMPONENTS
import LoginReduxForm from "./LoginReduxForm"

const Login: FC<LoginT> = memo(() => {
  const isAuth = useSelector((state: AppStateT) => state.auth.isAuth)
  const captchaUrl = useSelector((state: AppStateT) => state.auth.captchaUrl)

  const dispatch = useDispatch()

  const onSubmit = (formData: LoginFormValueT) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
  }

  if (isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div className={lm.header}>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  )
})

export default Login

type LoginT = {}

type LoginFormValueT = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
