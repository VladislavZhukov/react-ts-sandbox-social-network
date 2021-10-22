import { ComponentType, Suspense } from "react"

export function withSuspense<WPT>(WrappedComponent: ComponentType<WPT>) {
    return (props: WPT) => {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <WrappedComponent {...props} />
            </Suspense>)
    }
}