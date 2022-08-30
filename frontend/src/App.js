import './App.css';
import Chat from './components/chat/chat';
import MessageInput from './components/message-input/message-input';
import UserProvider from './components/user-provider/user-provider';

function App() {
  return (
    <div className='container'>
      <UserProvider>
        <Chat />
        <MessageInput />
      </UserProvider>
    </div>
  );
}

export default App;
