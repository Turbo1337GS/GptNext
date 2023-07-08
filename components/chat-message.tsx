export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
};


export const initialMessages: Message[] = [
  {
    who: "bot",
    message: "Please Check https://github.com/Turbo1337GS",
  },
];

import ReactMarkdown from 'react-markdown';

export const ChatMessage = ({ who, message = "" }: Message) => {
  const side = who === "user" ? "right" : "left";
  const name = who === "user" ? "You" : "GPT By Turbo1337GS";

  return (
    <div className={`message ${side}`}>
      <p className="name">{name}</p>
      <ReactMarkdown>{message}</ReactMarkdown>
    </div>
  );
};
