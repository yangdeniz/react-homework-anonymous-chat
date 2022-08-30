import { useContext, useState } from 'react';
import API from '../../shared/api';
import UserContext from '../user-provider/user-context';
import './message-input.css';

function MessageInput() {
  const [text, setText] = useState('');
  const {userId} = useContext(UserContext);

  const onClick = () => {
    if (!text) {
      return;
    }
    fetch(API, { 
      method: 'POST', 
      body: JSON.stringify({ id: 0, userId: userId, content: text })
    })
    .then(() => setText(''));
  }

  return (
    <div className='message-input'>
      <textarea value={text} onChange={e => setText(e.target.value)}></textarea>
      <button className='message-input-btn' onClick={onClick}></button>
    </div>
  )
}

export default MessageInput;