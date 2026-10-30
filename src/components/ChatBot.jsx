import { useState } from "react";
import "./ChatBot.css";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I'm Vijay's Portfolio Assistant. How can I help you?",
    },
  ]);

  // Chatbot reply logic
  const getBotReply = (message) => {
    const msg = message.toLowerCase();

    if (
      msg.includes("hello") ||
      msg.includes("hi") ||
      msg.includes("hey")
    ) {
      return "Hello 👋 Welcome to Vijay's portfolio! How can I help you?";
    }

    if (msg.includes("about") || msg.includes("who is vijay")) {
      return "Vijay is a web developer who builds modern and responsive web applications using React JS, JavaScript, HTML and CSS.";
    }

    if (
      msg.includes("skill") ||
      msg.includes("technology") ||
      msg.includes("tech")
    ) {
      return "Vijay works with HTML, CSS, JavaScript, React JS, Git, GitHub, Node.js and Express.js.";
    }

    if (
      msg.includes("project") ||
      msg.includes("work")
    ) {
      return "You can check Vijay's projects in the Projects section. It includes projects such as a Portfolio Website, Weather App and Task Manager.";
    }

    if (
      msg.includes("contact") ||
      msg.includes("email") ||
      msg.includes("hire")
    ) {
      return "You can contact Vijay using the Contact Me section below. Fill out the form and send your message.";
    }

    if (
      msg.includes("resume") ||
      msg.includes("cv")
    ) {
      return "You can view or download Vijay's resume from the Resume section of the portfolio.";
    }

    if (msg.includes("react")) {
      return "Yes! Vijay works with React JS and uses it to build responsive and interactive web applications.";
    }

    if (
      msg.includes("thank") ||
      msg.includes("thanks")
    ) {
      return "You're welcome! 😊 Let me know if you need anything else.";
    }

    if (
      msg.includes("bye") ||
      msg.includes("goodbye")
    ) {
      return "Goodbye! 👋 Thanks for visiting Vijay's portfolio.";
    }

    return "Sorry, I didn't understand that. You can ask me about Vijay's skills, projects, resume, experience, or contact information.";
  };

  // Send message
  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    const reply = getBotReply(input);

    const botMessage = {
      sender: "bot",
      text: reply,
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      botMessage,
    ]);

    setInput("");
  };

  // Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-container">

          {/* Header */}
          <div className="chatbot-header">
            <div>
              <h3>Help Desk</h3>
              <span>● Online</span>
            </div>

            <button onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === "user"
                    ? "message user-message"
                    : "message bot-message"
                }
              >
                {message.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={sendMessage}>
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open help desk"
      >
        {isOpen ? "✕" : "💬"}
      </button>
       
       {/* CTA Button */}
        <a
          href="#contact"
          className="floating-cta"
          aria-label="Contact Vijay"
        >
          <span className="cta-icon">🚀</span>
          <span className="cta-text">Hire Me</span>
        </a>

    </>
  );
}

export default ChatBot;