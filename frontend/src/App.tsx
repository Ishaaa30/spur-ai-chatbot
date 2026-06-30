import { useState, useEffect, useRef } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [sessionId, setSessionId] = useState<string | null>(
    localStorage.getItem("sessionId"),
  );

  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    [],
  );

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadHistory = async () => {
      if (!sessionId) return;

      const response = await fetch(`${API_URL}/chat/history/${sessionId}`);

      const data = await response.json();

      if (data?.messages) {
        setMessages(
          data.messages.map((msg: any) => ({
            sender: msg.sender,
            text: msg.text,
          })),
        );
      }
    };

    loadHistory();
  }, [sessionId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    // Show user message immediately
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      if (data.sessionId) {
        localStorage.setItem("sessionId", data.sessionId);

        setSessionId(data.sessionId);
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Spur AI Chat</h1>

      <div className="chat-container" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-row ${
              msg.sender === "user" ? "user-row" : "ai-row"
            }`}
          >
            <div
              className={`message-bubble ${
                msg.sender === "user" ? "user-bubble" : "ai-bubble"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-row ai-row">
            <div className="message-bubble ai-bubble">AI is typing...</div>
          </div>
        )}
      </div>

      <div className="input-container">
        <input
          className="chat-input"
          value={message}
          disabled={loading}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              sendMessage();
            }
          }}
        />

        <button
          className="send-button"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default App;
