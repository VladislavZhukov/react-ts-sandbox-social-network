import { FC, useEffect, useState } from "react"

type TimerPropsT = {
    timerKey: string
    seconds: number
    onChange: (actualSecond: number) => void
}

export const Timer: FC<TimerPropsT> = ({ timerKey, seconds, onChange }) => {
    const [_seconds, setSeconds] = useState(seconds)

    useEffect(() => {
        setSeconds(seconds)
    }, [seconds])

    useEffect(() => {
        onChange(_seconds)
    }, [_seconds, onChange])

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log(`TICK`)
            setSeconds((prev) => prev - 1)
        }, 1000)
        return () => { clearInterval(intervalId) }
    }, [timerKey])

    return (
        <>
            <div>
                {_seconds}
            </div>
        </>
    )
}