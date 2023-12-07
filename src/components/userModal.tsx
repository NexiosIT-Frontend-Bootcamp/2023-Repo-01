// UserModal.js
import { useState } from 'react';
import { getUser } from '../api/userService';
import { useQuery } from '@tanstack/react-query';

interface UserModalProps {
    onClose: () => void;
    onSelectUsers: (selectedUser: string[], roomName: string) => void;
    jwt: string | undefined;
}

const UserModal = ({ onClose, onSelectUsers, jwt }: UserModalProps) => {
  const {data: users} = useQuery({queryKey: ['users'], queryFn: () => getUser(jwt??'')});
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [roomName, setRoomName] = useState('');

  const handleAddUsers = () => {
    onSelectUsers(selectedUsers, roomName);
    onClose();
  };

  const handleUserSelect = (userId: string) => {
    // Toggle the selected user
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  return (
    <div className="user-modal">
        <h2>Create a Chatroom:</h2>
        <label>Room name:</label>
        <input type='text' value={roomName} onChange={(e) => setRoomName(e.target.value)}></input>
      <label>Select Users</label>
      <div>
        {users?.map(user => (
          <label key={user._id}>
          <input
            type="checkbox"
            value={user._id}
            checked={selectedUsers.includes(user._id)}
            onChange={() => handleUserSelect(user._id)}
          />
          {user.username}
        </label>
        ))}
    </div>
      <button onClick={handleAddUsers}>Add Room</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default UserModal;
