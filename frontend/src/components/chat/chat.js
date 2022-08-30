import { useEffect, useState, useRef } from 'react';
import Message from './message/message';
import API from '../../shared/api';
import './chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [colors, setColors] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const chatRef = useRef();
  let lastId = 0;

  const getRandomColor = () => {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
  }

  const updateColors = (users) => {
    for (const user of new Set(users)) {
      if (!colors[user]) {
        setColors(prev => ({...prev, [`${user}`]: getRandomColor()}));
      }
    }
  }

  const fetchMessages = () => {
    fetch(`${API}?from=${lastId}`)
      .then(response => response.json())
      .then(messages => {
        lastId = messages.map(m => m.id).reduce((a, b) => Math.max(a, b), lastId);
        updateColors(messages.map(m => m.userId));
        setMessages(messages);
      })
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => fetchMessages(), 1000);
    return () => clearTimeout(timeoutId);
  });

  useEffect(() => {
    if (!scrolled) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  });

  const onScroll = () => {
    const isScrolled = chatRef.current.scrollTop + chatRef.current.clientHeight < chatRef.current.scrollHeight;
    setScrolled(isScrolled);
  }

  return (
    <div ref={chatRef} className='chat' onScroll={onScroll}>
      {messages.map(msg => <Message key={msg.id} {...msg} color={colors[msg.userId]} />)}
    </div>
  );
}

export default Chat;