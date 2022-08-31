import { User } from "../types";
import { Message } from "./Message";

interface ChatProps {
  messages: Message[];
  currentUser?: User;
}
export const Chat = ({ messages, currentUser }: ChatProps) => {
  return (
    <div className="w-full">
      <div className="relative w-full p-6 overflow-y-auto max-h-[36rem] min-w-24">
        <ul className="space-y-2">
          {messages.map((m) => {
            const sendByCurrentUser = currentUser?.id === m.user.id;
            return (
              <Message key={m.id} message={m} isSender={sendByCurrentUser} />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
