import { Button } from "antd"
import { FC, memo, useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer"
import { selectStatus } from "../../redux/chat-selectors"
import { AppStateT } from "../../redux/store-redux"

const ChatPage: FC = memo(() => {
    return (
        <Chat />
    )
})

const Chat: FC = memo(() => {
    const dispatch = useDispatch()

    const status = useSelector(selectStatus)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {status === 'error' ? <div>Some error occurred. Please refresh page.</div> :
                <>
                    <Messages />
                    <AddMessageForm />
                </>
            }
        </div>
    )
})

const Messages: FC = memo(() => {
    const messages = useSelector((state: AppStateT) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.scrollHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }
    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, isAutoScroll])
    return (
        <div style={{ height: '300px', overflow: 'auto' }} onScroll={scrollHandler} >
            {messages.map((m, i) => <Message message={m} key={m.id} />)}
            <div ref={messagesAnchorRef}></div>
        </div >
    )
})

const Message: FC<{ message: ChatMessageType }> = memo(({ message }) => {
    return (
        <div>
            <div>
                <img src={message.photo} style={{ width: '30px' }} />
                <b>{message.userName}</b>
            </div>
            <div>
                {message.message}
            </div>
        </div>
    )
})

const AddMessageForm: FC = memo(() => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector(selectStatus)
    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <Button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
            </div>
        </div>
    )
})

export default ChatPage

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}