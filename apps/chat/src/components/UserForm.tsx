import { FormEvent, useState } from "react";

interface UserFormProps {
  onSubmit: (name: string) => void;
}

export const UserForm = ({ onSubmit }: UserFormProps) => {
  const [name, setName] = useState<string>("");

  const handleSaveUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(name);
  };

  return (
    <form onSubmit={handleSaveUser}>
      <div className="flex flex-col justify-center text-center mx-auto max-w-md min-h-screen">
        <label htmlFor="name" className="mb-4">
          Enter your name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Your name"
          className="block w-full text-center px-2 py-2 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
          onChange={(event) => setName(event.target.value)}
        />
        <div className="mt-4">
          <button
            type="submit"
            className="border-2 px-4 py-2 rounded-full border-black"
          >
            Enter Chat
          </button>
        </div>
      </div>
    </form>
  );
};
