import { useState } from "react";
import '../styles/components/chatView.css';
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMessages, postMessage } from "../api/messageService";
import { getRoom } from "../api/roomService";
import MessageView from "./messageView";
import { Message } from "../types/message";

interface ChatViewProps {
    selectedChatroom: string | undefined;
    jwt: string | undefined;
    userId: string | undefined;
}

export default function ChatView({selectedChatroom, jwt, userId}: ChatViewProps) {
    const { data: messages, refetch: refetchMessage } = useQuery({queryKey: ["messages"], queryFn: () => getMessages(jwt??'')})
    const { data: chatroom } = useQuery({queryKey: ["chatroom", selectedChatroom], queryFn: () => getRoom(selectedChatroom??'', jwt??'')})
    const { mutate: sendMessage } = useMutation({mutationFn: (message: Message) => postMessage(message, jwt??'')})
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        sendMessage({user: userId??'', chatroom: selectedChatroom??'', data: newMessage})
        setNewMessage('');
        refetchMessage();
      };

    return (
        <div className="chat-view">
        <div className="chat-header">
            <h2>{chatroom?.name}</h2>
        </div>
        <div className="chat-history">
            {messages?.filter((mess) => mess.chatroom === selectedChatroom).map((message, index) => (
                <MessageView message={message} index={index} userId={userId} jwt={jwt}/>
            ))}
        </div>
        <div className="chat-input">
            <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
        </div>
    )
}