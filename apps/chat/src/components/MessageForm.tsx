import { FormEvent, useState } from "react";

interface MessageFormProps {
  onSubmit: (message: string) => void;
}
export const MessageForm = ({ onSubmit }: MessageFormProps) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full flex py-2">
        <input
          type="text"
          className="block w-full  px-2 py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
          placeholder="Type your message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          type="submit"
          className="border-2 mr-2 px-4 py-2 rounded-full border-black"
        >
          Send
        </button>
      </div>
    </form>
  );
};
