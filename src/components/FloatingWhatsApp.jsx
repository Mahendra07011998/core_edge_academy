import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaPaperPlane,
  FaRobot,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";

const whatsappNumber = "918885492139";

const quickReplies = [
  "Courses",
  "Fees",
  "Batch timings",
  "Placement support",
  "Contact advisor",
];

const initialMessages = [
  {
    from: "bot",
    text: "Hi! I am Core Edge assistant. Ask me about courses, batches, fees, placement support, or contact options. If I cannot answer, I will connect you with our team on WhatsApp.",
  },
];

function getBotReply(message) {
  const text = message.toLowerCase();

  if (text.includes("course")) {
    return "We offer AI, Data Analytics, Software Testing, Full Stack, DevOps, Scrum Master, Flutter, Business Analytics, Tableau with AI, Cyber Security, and Frontend Development.";
  }

  if (
    text.includes("fee") ||
    text.includes("price") ||
    text.includes("cost")
  ) {
    return "Fees vary by course and batch mode. Please share the course name, and our advisor can guide you with the latest fee details.";
  }

  if (
    text.includes("batch") ||
    text.includes("time") ||
    text.includes("timing")
  ) {
    return "We have online, offline, and hybrid training options. Batch timing depends on the selected course and current schedule.";
  }

  if (
    text.includes("placement") ||
    text.includes("job") ||
    text.includes("support")
  ) {
    return "Yes, we provide placement assistance, resume guidance, mock interviews, aptitude training, HR preparation, and interview support.";
  }

  if (
    text.includes("contact") ||
    text.includes("advisor") ||
    text.includes("call")
  ) {
    return "You can call or WhatsApp us at +91 8885492139. You can also submit the contact form on this website.";
  }

  return "I could not find an instant answer. Our team can help you with this. Please continue on WhatsApp to speak with our advisor.";
}

function shouldOpenWhatsApp(message) {
  const text = message.toLowerCase();

  return !(
    text.includes("course") ||
    text.includes("fee") ||
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("batch") ||
    text.includes("time") ||
    text.includes("timing") ||
    text.includes("placement") ||
    text.includes("job") ||
    text.includes("support") ||
    text.includes("contact") ||
    text.includes("advisor") ||
    text.includes("call")
  );
}

function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop =
        chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const whatsappUrl = useMemo(() => {
    const lastUserMessage =
      [...messages]
        .reverse()
        .find((message) => message.from === "user")?.text ||
      "Hi Core Edge Academy, I want to know more about your courses.";

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      lastUserMessage
    )}`;
  }, [messages]);

  const sendMessage = (messageText = input) => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage) {
      return;
    }

    const botText = getBotReply(trimmedMessage);
    const needsWhatsapp = shouldOpenWhatsApp(trimmedMessage);

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        from: "user",
        text: trimmedMessage,
      },
      {
        from: "bot",
        text: botText,
      },
      ...(needsWhatsapp
        ? [
            {
              from: "bot",
              text: "If you would like a personal response from our team, you can continue on WhatsApp below.",
            },
          ]
        : []),
    ]);

    setInput("");

    if (needsWhatsapp) {
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          `Hello Core Edge, I asked: ${trimmedMessage} and would like a team response.`
        )}`,
        "_blank"
      );
    }
  };

  return (
    <div className="floating-chat">

      {/* CHATBOT PANEL */}
      {isOpen && (
        <div
          className="floating-chat-panel"
          role="dialog"
          aria-label="Core Edge chatbot"
        >

          {/* CHAT HEADER */}
          <div className="floating-chat-head">
            <div className="chat-head-info">
              <span className="chat-avatar">
                <FaRobot />
              </span>

              <div>
                <h3>Core Edge Assistant</h3>
                <p>Usually replies instantly</p>
              </div>
            </div>

            {/* ONLY CLOSE BUTTON */}
            <button
              type="button"
              className="chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <FaTimes />
            </button>
          </div>

          {/* CHAT MESSAGES */}
          <div
            className="floating-chat-body"
            ref={chatBodyRef}
          >
            {messages.map((message, index) => (
              <div
                className={`chat-message ${message.from}`}
                key={`${message.from}-${index}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          {/* QUICK REPLIES */}
          <div className="quick-replies">
            {quickReplies.map((reply) => (
              <button
                type="button"
                key={reply}
                onClick={() => sendMessage(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          {/* INPUT */}
          <form
            className="chat-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              aria-label="Type your question"
            />

            <button
              type="submit"
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </form>

          {/* WHATSAPP */}
          <a
            className="chat-whatsapp-link"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
            Continue on WhatsApp
          </a>
        </div>
      )}

      {/* CHAT BUTTON
          Completely hidden while chatbot is open */}
      {!isOpen && (
        <button
          type="button"
          className="chat-toggle-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
        >
          <FaRobot />
          <span>Chat</span>
        </button>
      )}

      {/* WHATSAPP BUTTON
          Always remains visible */}
      <a
        className="floating-whatsapp-button"
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          "Hi Core Edge, I would like to speak with your team."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp"
      >
        <FaWhatsapp />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}

export default FloatingWhatsApp;
