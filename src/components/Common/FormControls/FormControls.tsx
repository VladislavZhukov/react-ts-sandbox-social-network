import { FC } from "react";
import { Field } from "redux-form"
import styles from "./FormControls.module.css"
import { FieldValidatorT } from "../../../utils/validators/validator"
import { WrappedFieldProps } from "redux-form"

const FormControl: FC<WrappedFieldProps> = ({ meta: { touched, error }, children }) => {
  const hasError = touched && error;
  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  )
}

export const Textarea: FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  )
}

export const Input: FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  )
}

export function createField<FromKeysType extends string> (
  name: FromKeysType,
  placeholder: string | undefined,
  component: FC<WrappedFieldProps>,
  validate: Array<FieldValidatorT>,
  props = {},
  text: string = ""
) {
  return (
    <div>
      <Field
        name={name}
        placeholder={placeholder}
        component={component}
        validate={validate}
        {...props}
      />
      {text}
    </div>
  )
}
