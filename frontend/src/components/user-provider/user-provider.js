import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserContext from './user-context';

function UserProvider(props) {
  const key = 'user_id';
  const [userId, setUserId] = useState('');

  useEffect(() => {
    let savedUserId = localStorage.getItem(key);
    if (!savedUserId || savedUserId === 'null') {
      localStorage.removeItem(key);
      savedUserId = uuidv4();
      localStorage.setItem(key, savedUserId);
    }
    setUserId(savedUserId);
  }, [userId]);
  
  return (
    <UserContext.Provider value={{userId}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider;