import { Message } from "../types/message";


interface MessageViewProps {
    index: number;
    message: Message;
    userId: string | undefined;
    jwt: string | undefined;
}

export default function MessageView({index, message, userId}: MessageViewProps) {

    return (
        <div key={index} className={`message ${message.user === userId ? 'sent' : 'received'}`}>
            <p>{message.data}</p>
            <span>{message.user === userId ? 'Me' : message.user}</span>
        </div>
    )
}