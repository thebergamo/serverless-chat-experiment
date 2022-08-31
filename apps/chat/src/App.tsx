import { useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import { Chat } from "./components/Chat";
import { Message } from "./components/Message";
import { MessageForm } from "./components/MessageForm";
import { UserForm } from "./components/UserForm";
import { User } from "./types";
import { getUser, saveUser } from "./services/storage";
import { useWorker } from "./utils/worker.hook";

const messages = [
  {
    id: 1,
    sendAt: new Date(),
    user: { id: "mark_b", name: "Mark B" },
    message: "Yo Yo",
  },
  {
    id: 2,
    sendAt: new Date(),
    user: { id: "lady_d", name: "Cady D" },
    message: "Yo Yo",
  },
  {
    id: 3,
    sendAt: new Date(),
    user: { id: "jonh_w", name: "Paul W" },
    message: "Yo Yo",
  },
  {
    id: 4,
    sendAt: new Date(),
    user: { id: "mark_b", name: "Mark B" },
    message: "Yo Yo",
  },
  {
    id: 5,
    sendAt: new Date(),
    user: { id: "mary_j", name: "Mary J" },
    message: "Yo Yo",
  },
  {
    id: 6,
    sendAt: new Date(),
    user: { id: "lou_h", name: "Aou H" },
    message: "Yo Yo",
  },
  {
    id: 7,
    sendAt: new Date(),
    user: { id: "lou_h", name: "Aou H" },
    message: "Yo Yo",
  },
  {
    id: 8,
    sendAt: new Date(),
    user: { id: "lou_h", name: "Aou H" },
    message: "Yo Yo",
  },
];

function App() {
  const { pushWorker } = useWorker();
  const [currentUser, setCurrentUser] = useState<User | null>(getUser());

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
    </div>
  );
}

export default App;
