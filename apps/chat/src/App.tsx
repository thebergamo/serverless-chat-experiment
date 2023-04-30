import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { Chat } from "./components/Chat";
import { Message } from "./components/Message";
import type { Message as MessageType } from "./components/Message";
import { MessageForm } from "./components/MessageForm";
import { UserForm } from "./components/UserForm";
import { User } from "./types";
import { getUser, saveUser } from "./services/storage";
import ReloadPrompt from "./components/ReloadPrompt";
import { retrieveMessages } from "./services/messages";

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(getUser());

  useEffect(() => {
    const getMessages = async () => {
      const newMessages = await retrieveMessages();
      setMessages(newMessages);
    };

    getMessages();
  }, []);

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: nanoid(),
      sendAt: new Date(),
      user: currentUser || ({} as User),
      message,
    };

    console.log({ message, newMessage });
  };

  const handleSetUser = (name: string) => {
    const user = {
      id: nanoid(),
      name,
    };
    setCurrentUser(user);
    saveUser(user);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl">Experimental Chat</h1>
        <h2 className="text-lg text-gray-500">No Web Sockets Allowed</h2>
      </header>
      <div className="border rounded mb-4">
        {currentUser ? (
          <>
            <Chat messages={messages} currentUser={currentUser} />
            <MessageForm onSubmit={handleSendMessage} />
          </>
        ) : (
          <UserForm onSubmit={handleSetUser} />
        )}
      </div>
      <ReloadPrompt />
    </div>
  );
}

export default App;
