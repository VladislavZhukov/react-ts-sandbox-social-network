//CORE
import { Field, Formik } from "formik"
import { FC, memo } from "react"
import { useSelector } from "react-redux"
//TYPES
import { FilterSearchT } from "../../../redux/friends-reducer"
//SELECTORS
import { getFriendsFilter } from "../../../redux/friends-selectors"

const FriendsSearchForm: FC<PropsT> = memo(({ onFilterChanged }) => {
    const friendsSearchFormValidate = (validate: any) => {
        const errors = {}
        return errors
    }
    const filter = useSelector(getFriendsFilter)

    const submit = (values: FormSearchT, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterSearchT = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        onFilterChanged(filter)
        setSubmitting(false)
        
    }
    return (
        <Formik
            enableReinitialize
            initialValues={{ term: filter.term, friend: String(filter.friend) }}
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
                isSubmitting
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

    type FormSearchT = {
        term: string,
        friend: string
    }
})

export default FriendsSearchForm

type PropsT = {
    onFilterChanged: (filter: FilterSearchT) => void
}