import { type NextRequest, NextResponse } from "next/server";
import { type Message, initialMessages } from "../../components/chat-message";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY");
}

const botName = "GPT-by https://github.com/Turbo1337GS";
const userName = "User";

const generateMessagesFromHistory = (messages: Message[]) => {
  const initialUserMessage = {role: "user", content: messages[1].message};
  const formattedMessages = messages.slice(2).map((message: Message) => ({
    role: message.who === "user" ? "user" : "assistant",
    content: message.message
  }));
  return [initialUserMessage, ...formattedMessages];
};

export const config = {
  runtime: "edge",
};
export default async function handler(req: NextRequest) {
  const body = await req.json();
  const messages = generateMessagesFromHistory(body.messages);
  const payload = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    user: body?.user,
  };

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: requestHeaders,
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.error) {
    console.error("OpenAI API error: ", data.error);
    return NextResponse.json({
      text: `ERROR with API integration. ${data.error.message}`,
    });
  }

  return NextResponse.json({ text: data.choices[0].message.content });
}
