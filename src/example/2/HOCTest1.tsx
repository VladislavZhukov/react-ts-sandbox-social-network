import { ComponentType, FC } from "react";
import { compose } from "redux";

// WPT - wrapped props type 
function AuthorHOC<WPT extends { author: string }>(WrappedComponent: ComponentType<WPT>) {
    let ContainerComponent: FC<Omit<WPT, `author`>> = (props) => {
        return <div><WrappedComponent {...props as WPT} author={`JoJo Boss`} /></div>
    }
    return ContainerComponent
}

function NumberOfPagesHOC<WPT extends { numberOfPages: number }>(WrappedComponent: ComponentType<WPT>) {
    let ContainerComponent: FC<Omit<WPT, `numberOfPages`>> = (props) => {
        return <div><WrappedComponent {...props as WPT} numberOfPages={230} /></div>
    }
    return ContainerComponent
}

type C1PropsType = {
    title: string
    author: string
    numberOfPages: number
    age: number
}
type C1Type = FC<C1PropsType>

const C1: C1Type = (props) => {
    return <div>{props.title}</div>
}

const C1Container1 = AuthorHOC(C1)
const C1Container2 = NumberOfPagesHOC(C1Container1)

type FromAuthorHOCPropsType = Omit<C1PropsType, `author`>
type FromAuthorHOCType = ComponentType<FromAuthorHOCPropsType>
type FromNumberOfPagesHOCType = ComponentType<Omit<FromAuthorHOCPropsType, `numberOfPages`>>

let SuperHOC = compose<
    FromAuthorHOCType,
    ComponentType<C1PropsType>,
    FromNumberOfPagesHOCType>(
        NumberOfPagesHOC,
        AuthorHOC
    )

const C1Container3 = SuperHOC(C1)

//* C1Container3 === C1Container2

export const HOCTest1 = () => {
    return <>
        <C1Container2 title='JOJO SAN 1' age={20} />
        <C1Container3 title='JOJO SAN 2' age={30} />
    </>

}
