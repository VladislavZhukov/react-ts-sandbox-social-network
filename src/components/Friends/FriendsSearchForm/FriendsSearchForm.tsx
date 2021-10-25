import { Field, Formik } from "formik"
import { FC, memo } from "react"
import { FilterSearchT } from "../../../redux/friends-reducer"

type PropsT = {
    onFilterChanged: (filter: FilterSearchT) => void
}

const FriendsSearchForm: FC<PropsT> = memo(({ onFilterChanged }) => {
    const friendsSearchFormValidate = (validate: any) => {
        const errors = {}
        return errors
    }

    type FormSearchT = {
        term: string,
        friend: string
    }
    const submit = (values: FormSearchT, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        debugger
        const filter: FilterSearchT = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        onFilterChanged(filter)
        setSubmitting(false)
    }
    return (
        <Formik
            initialValues={{ term: '', friend: 'null' }}
            validate={friendsSearchFormValidate}
            onSubmit={submit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                    <input
                        type="term"
                        name="term"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.term}
                    />
                    {errors.term && touched.term && errors.term}
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Ony followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Fiend
                    </button>
                </form>
            )}
        </Formik>
    )
})

export default FriendsSearchForm