import { useContext, useEffect, useRef } from 'react';
import UserContext from '../../user-provider/user-context';
import './message.css';

function Message(props) {
  const {userId} = useContext(UserContext);
  const self = props.userId === userId;
  const messageRef = useRef();

  useEffect(() => {
    if (props.color) {
      messageRef.current.style.backgroundColor = props.color;
    }
  });

  return (
    <div ref={messageRef} className={`message ${self ? 'message-self' : ''}`}>
      {props.content}
    </div>
  )
}

export default Message;