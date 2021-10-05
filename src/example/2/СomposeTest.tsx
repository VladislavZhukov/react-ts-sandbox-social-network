import { compose } from 'redux';

const f1 = (a: string) => ` ${a} F1`
const f2 = (b: string) => ` ${b} F2`
const f3 = (c: string) => ` ${c} F3`

let res = compose(
    f3,
    f2,
    f1)(`Order of execution of functions`)

const ComposeTest = () => {
    return (
        <div>
            <div>{res}</div>
        </div>
    )
}

export default ComposeTest
