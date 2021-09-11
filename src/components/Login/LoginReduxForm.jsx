import React from "react";
import { reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../utils/validators/validator";
import { Input, createField } from "../Common/FormControls/FormControls";
import style from "../Common/FormControls/FormControls.module.css";

const maxLength50 = maxLengthCreator(50);

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField("email", "Email", Input, [required, maxLength50])}
      {createField("password", "Password", Input, [required, maxLength50], {
        type: "password",
      })}
      {createField(
        "rememberMe",
        null,
        Input,
        [],
        { type: "checkbox" },
        "remember me"
      )}
      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
      {captchaUrl && createField("captcha", "Symbol from image", Input, [required])}
      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button>LOGIN</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

export default LoginReduxForm;
