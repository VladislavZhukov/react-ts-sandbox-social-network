export type FieldValidatorT = (value: string) => string | undefined

export const required: FieldValidatorT = (value) => {
    if (value) return undefined
    return "Field is required"
}

export const maxLengthCreator = (maxLength: number): FieldValidatorT => (value) => {
    if (value && value.length > maxLength) return `max length is ${maxLength} symbols`
    return undefined
}