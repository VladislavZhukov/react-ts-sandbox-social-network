import React, { ComponentType, FC } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { AppStateT } from "../redux/store-redux";

const mapStateToPropsForRedirect = (state: AppStateT) => ({
    isAuth: state.auth.isAuth
} as MapPropsT)

type MapPropsT = {
    isAuth: boolean
}

export function withAuthRedirect<WPT>(WrappedComponent: ComponentType<WPT & MapPropsT>) {
    const RedirectComponent: FC<MapPropsT> = (props) => {
        let { isAuth } = props
        if (!isAuth) {
            return <Redirect to={"/login"} />;
        } else {
            return <WrappedComponent {...props as WPT & MapPropsT} />;
        }
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsT, {}, WPT, AppStateT>(mapStateToPropsForRedirect)
        (RedirectComponent)

    return ConnectedAuthRedirectComponent
}