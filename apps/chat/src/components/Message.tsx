import { User } from "../types";
import { Avatar } from "./Avatar";

export interface Message {
  id: string | number;
  sendAt: Date;
  user: User;
  message: string;
}

interface MessageProps {
  message: Message;
  isSender?: boolean;
}

export const Message = ({ message, isSender }: MessageProps) => {
  return (
    <li className={`${isSender ? "justify-start" : "justify-end"} flex mb-4 `}>
      <span className={`${isSender ? "order-1 mr-2" : "order-2 ml-2"}`}>
        <Avatar
          initials={message.user.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase()}
        />
      </span>
      <div
        className={`relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow ${
          isSender ? "order-2" : "order-1 "
        }`}
      >
        <span className="text-xs text-gray-400">
          {`${message.sendAt.toLocaleDateString()}
        ${message.sendAt.toLocaleTimeString()}`}
        </span>
        <span className="block">{message.message}</span>
      </div>
    </li>
  );
};
