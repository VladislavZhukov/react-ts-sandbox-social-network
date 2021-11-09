import { Button } from "antd";
import { FC, memo, useEffect, useState } from "react";

//const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: FC = memo(() => {
    return (
        <Chat />
    )
})

const Chat: FC = memo(() => {
    const [wsChanel, setWsChanel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            console.log('CLOSE WS')
            setTimeout(createChanel, 3000)
        }
        function createChanel() {
            if (ws !== null && ws !== undefined) {
                ws.removeEventListener('close', closeHandler)
                ws.close()
            }
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChanel(ws)
        }
        createChanel()
        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChanel={wsChanel} />
            <AddMessageForm wsChanel={wsChanel} />
        </div>
    )
})

const Messages: FC<{ wsChanel: WebSocket | null }> = memo(({ wsChanel }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }
        wsChanel?.addEventListener('message', messageHandler)
        return () => {
            wsChanel?.removeEventListener('message', messageHandler)
        }
    }, [wsChanel])
    return (
        <div style={{ height: '300px', overflow: 'auto' }} >
            {messages.map((m, i) => <Message message={m} key={i} />)}
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

const AddMessageForm: FC<{ wsChanel: WebSocket | null }> = memo(({ wsChanel }) => {
    const [message, setMessage] = useState('')
    const [wsStatus, setWsStatus] = useState<'pending' | 'ready'>('pending')

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChanel?.send(message)
        setMessage('')
    }

    useEffect(() => {
        const openHandler = () => {
            setWsStatus('ready')
        }
        wsChanel?.addEventListener('open', openHandler)
        return () => {
            wsChanel?.removeEventListener('open', openHandler)
        }
    }, [wsChanel])
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <Button disabled={wsStatus !== 'ready'} onClick={sendMessage}>Send</Button>
            </div>
        </div>
    )
})

export default ChatPage