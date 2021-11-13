const subscribers = {
    'messages-received': [] as MessagesReceivedSubscribersT[],
    'status-changed': [] as StatusChangedSubscribersT[]
}

let ws: WebSocket | null = null


const closeHandler = () => {
    console.log('CLOSE WS')
    notifySubscribersAboutStatus('pending')
    setTimeout(createChanel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.log('REFRESH PAGE')
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusT) => {
    subscribers['status-changed'].forEach(s => s(status))
} 

function createChanel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        closeHandler()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventNamesT, callback: MessagesReceivedSubscribersT | StatusChangedSubscribersT) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventNamesT, callback: MessagesReceivedSubscribersT | StatusChangedSubscribersT) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

type MessagesReceivedSubscribersT = (message: ChatMessageAPIType[]) => void
type StatusChangedSubscribersT = (status: StatusT) => void

export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}
export type StatusT = 'pending' | 'ready' | 'error'
type EventNamesT = 'messages-received' | 'status-changed'

