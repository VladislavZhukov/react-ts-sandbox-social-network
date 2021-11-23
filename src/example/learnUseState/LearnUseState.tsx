import { useState } from "react"

const LearnUseStateEx1 = () => {
    console.log('COMPONENT RENDER')
    //хуки в компоненте должны вызываться столько же раз, сколько и при первой отрисовке
    //хук не должен вызываться внутри if else или циклов
    //хук useState получает стартовое значение и фиксирует его один раз
    let [point1, setPoint1] = useState(() => 10)
    let [point2, setPoint2] = useState(() => 10)

    return (
        <>
            <div>
                <div>Gabe Logan Newell</div>
                <div>{point1}</div>
                {/*избегать в react операторов ++, чтобы не мутировать значения текущей переменной или свойства*/}
                <button onClick={() => { setPoint1((actual) => actual + 1) }}>+</button>
                <hr />
                <div>Bobby» Kotick</div>
                <div>{point2}</div>
                <button onClick={() => { setPoint2((actual) => actual + 1) }}>+</button>
                <hr />
                <button onClick={
                    () => {
                        setPoint1((actual) => actual - 1)
                        setPoint2((actual) => actual - 1)
                    }
                }>-</button>
                <button onClick={
                    () => {
                        setPoint1(10)
                        setPoint2(10)
                    }
                }>reset</button>
            </div>
        </>
    )
}

const LearnUseStateEx2 = () => {
    console.log('COMPONENT RENDER')

    let [points, setPoints] = useState({
        p1: 10,
        p2: 10
    })

    return (
        <>
            <div>
                <div>Gabe Newell</div>
                <div>{points.p1}</div>
                <button onClick={() => {
                    setPoints((actual) => {
                        return {
                            ...actual,
                            p1: actual.p1 + 1
                        }
                    })
                }}>+</button>
                <hr />
                <div>Bobby Kotick</div>
                <div>{points.p2}</div>
                <button onClick={() => {
                    setPoints((actual) => {
                        return {
                            ...actual,
                            p2: actual.p2 + 1
                        }
                    })
                }}>+</button>
                <hr />
                <button onClick={
                    () => {
                        setPoints((actual) => {
                            return {
                                ...actual,
                                p1: actual.p1 - 1,
                                p2: actual.p2 - 1
                            }
                        })
                    }
                }>-</button>
                <button onClick={
                    () => {
                        setPoints((actual) => {
                            return {
                                ...actual,
                                p1: 10,
                                p2: 10
                            }
                        })
                    }
                }>reset</button>
            </div>
        </>
    )
}

type UsersT = Array<[number, number]>

const findMax = (users: UsersT) => {
    console.log('fiend users')
    let maxPair = null

    for (let i = 0; i < users.length; i++) {
        if (maxPair === null) {
            maxPair = users[i]
        } else if (Math.max(users[i][0], users[i][1]) > Math.max(maxPair[0], maxPair[1])) {
            maxPair = users[i]
        }
    }
    return maxPair
}

const LearnUseStateEx3 = () => {
    console.log('COMPONENT RENDER')
    //предположим что массив users пришел к нам через props
    let usersProps: UsersT = [
        //...100000000000000000 users
        [1024, 768],
        [8, 16],
        [0, 1],
        [128, 256]
    ]
    //* ТАК ДЕЛАТЬ НЕ НУЖНО Т.К. ПРИ КАЖДОМ ИЗМЕНЕНИИ ВЫЗЫВАЕТСЯ findMax
    // let pairs = findMax(usersProps)
    // if (pairs === null) {
    //     pairs = [10, 10]
    // }
    // let [point1, setPoint1] = useState(pairs[0])
    // let [point2, setPoint2] = useState(pairs[1])
    let [point1, setPoint1] = useState(() => {
        let pair = findMax(usersProps)
        if (pair === null) {
            return 10
        }
        return pair[0]
    })
    let [point2, setPoint2] = useState(() => {
        let pair = findMax(usersProps)
        if (pair === null) {
            return 10
        }
        return pair[1]
    })

    return (
        <>
            <div>
                <div>Gabe Logan Newell</div>
                <div>{point1}</div>
                {/*избегать в react операторов ++, чтобы не мутировать значения текущей переменной или свойства*/}
                <button onClick={() => { setPoint1((actual) => actual + 1) }}>+</button>
                <hr />
                <div>Bobby» Kotick</div>
                <div>{point2}</div>
                <button onClick={() => { setPoint2((actual) => actual + 1) }}>+</button>
                <hr />
                <button onClick={
                    () => {
                        setPoint1((actual) => actual - 1)
                        setPoint2((actual) => actual - 1)
                    }
                }>-</button>
                <button onClick={
                    () => {
                        setPoint1(10)
                        setPoint2(10)
                    }
                }>reset</button>
            </div>
        </>
    )
}

export default LearnUseStateEx1
