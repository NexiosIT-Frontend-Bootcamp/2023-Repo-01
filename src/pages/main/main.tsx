import '../../styles/main.css';
import { useUserContext } from "../../contexts/useUserContext"
import Sidebar from '../../components/sidebar';
import { useState } from 'react';
import ChatView from '../../components/chatView';


function Main() {
    const { user, jwt, signOut } = useUserContext();
    const [selectedChatroom, setSelectedChatroom] = useState<string | undefined>('');

    return (
        <div className='container'>
            <Sidebar username={user?.username} jwt={jwt} _id={user?._id} signOut={signOut} setSelectedRoom={setSelectedChatroom}/>
            <ChatView selectedChatroom={selectedChatroom} jwt={jwt} userId={user?._id}/>
        </div>
    )
}

export default Main