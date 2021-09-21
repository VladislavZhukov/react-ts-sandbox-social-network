//CORE
import { FC } from "react"
import { InjectedFormProps, reduxForm } from "redux-form"
//STYLES
import style from "../Common/FormControls/FormControls.module.css"
//UTILS
import { maxLengthCreator, required } from "../../utils/validators/validator"
//my lib
import { Input, createField } from "../Common/FormControls/FormControls"

type LoginFormOwnPropsT = {
  captchaUrl: string | null
}
type LoginFormValueT = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}
type LoginFormValueK = Extract<keyof LoginFormValueT, string>

const maxLength50 = maxLengthCreator(50)

const LoginForm: FC<InjectedFormProps<LoginFormValueT, LoginFormOwnPropsT> & LoginFormOwnPropsT> = ({
  handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValueK>("email", "Email", Input, [required, maxLength50])}
      {createField<LoginFormValueK>("password", "Password", Input, [required, maxLength50], {
        type: "password",
      })}
      {createField<LoginFormValueK>(
        "rememberMe",
        undefined,
        Input,
        [],
        { type: "checkbox" },
        "remember me"
      )}
      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
      {captchaUrl && createField<LoginFormValueK>("captcha", "Symbol from image", Input, [required])}
      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button>LOGIN</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValueT, LoginFormOwnPropsT>({ form: "login" })(LoginForm)

export default LoginReduxForm
