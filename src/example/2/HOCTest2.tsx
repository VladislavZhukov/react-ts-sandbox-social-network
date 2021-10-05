import { ComponentType, FC } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
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
    age: number
    author: string
}
type MapPropsType = {
    numberOfPages: number
}
type C1ParamsType = {
    userId: string
}
type C1Type = FC<C1PropsType & MapPropsType & RouteComponentProps<C1ParamsType>>

const C1: C1Type = (props) => {
    console.log(props.match.params.userId)
    return <div>{props.title}</div>
}

let mstp = (state: any) => {
    return {
        author: `JoJo Boss 2`,
        numberOfPages: 460
    }
}

const C1Connect = connect(mstp)(C1);
const ConnectWithRouterC1_1 = withRouter(C1Connect)

const ConnectWithRouterC1_2 = compose<ComponentType<Omit<C1PropsType, `author`>>>(
    withRouter,
    connect(mstp),
    AuthorHOC
)(C1)

export const HOCTest2 = () => {
    return <>
        <ConnectWithRouterC1_1 title={"JOJO SAN 3"} age={24} />
        <ConnectWithRouterC1_2 title={"JOJO SAN 4"} age={34} />
    </>

}
