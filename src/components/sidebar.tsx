import { useState } from 'react';
import '../styles/components/sidebar.css'
import UserModal from './userModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Room } from '../types/room';
import { getRooms, postRoom } from '../api/roomService';

interface SidebarProps {
    username: string | undefined;
    jwt: string | undefined;
    _id: string | undefined;
    signOut: () => void;
    setSelectedRoom: (roomId: string | undefined) => void;
}

export default function Sidebar({username, jwt, _id, signOut, setSelectedRoom}: SidebarProps) {
    const [isUserModalOpen, setIsUserModalOpen] = useState(false); 
    const {mutate: createRoom} = useMutation({mutationFn: (room: Room) => postRoom(room, jwt??''), onSuccess:() => refetch()}); 
    const {data: chatrooms, refetch} = useQuery({queryKey: ['chatrooms'], queryFn: () => getRooms(jwt??'')});
    
    const handleCreateChatClick = () => {
        setIsUserModalOpen(true);
      };
    
      const handleUserModalClose = () => {
        setIsUserModalOpen(false);
      };

      const handleUserSelect = (selectedUser: string[], roomName: string) => {
        if (!selectedUser.includes(_id??'')) {
            selectedUser.push(_id??'')
        }
        console.log(selectedUser)
        createRoom({name: roomName, allowed_users: selectedUser});
      };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="user-info">
                    <div className="user-icon">{username?.charAt(0)}</div>
                    <div className="username">{username}</div>
                </div>
                <button className="settings-button" onClick={signOut}>
                    Logout
                </button>
                <button className='settings-button' onClick={handleCreateChatClick}>
                    Create chatroom
                </button>
            </div>
            {/* Render the UserModal when isUserModalOpen is true */}
            {isUserModalOpen && (
                <UserModal onClose={handleUserModalClose} onSelectUsers={handleUserSelect} jwt={jwt}/>
            )}
            <div className="sideBarChatlist">
                {chatrooms?.map((chat) => (
                    <div className="sidebar-header" style={{cursor: 'pointer'}}  key={chat.name} onClick={() => setSelectedRoom(chat._id)}>
                    <div className="user-info">
                        <div className="user-icon">{chat.allowed_users.length}</div>
                        <div className="username">{chat.name}</div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}