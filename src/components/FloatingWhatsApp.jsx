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
    text: "Hi! I am Core Edge assistant. Ask me about courses, batches, fees, placement support, or contact options.",
  },
];

function getBotReply(message) {
  const text = message.toLowerCase();

  if (
    text.includes("course") ||
    text.includes("courses") ||
    text.includes("training")
  ) {
    return "We offer AI, Data Analytics, Software Testing, Full Stack Development, DevOps, Scrum Master, Flutter, Business Analyst, Tableau with AI, Cybersecurity, and Frontend Development.";
  }

  if (
    text.includes("fee") ||
    text.includes("fees") ||
    text.includes("price") ||
    text.includes("cost")
  ) {
    return "Course fees vary depending on the course and batch mode. Please tell me which course you are interested in, and our advisor can share the latest fee details.";
  }

  if (
    text.includes("batch") ||
    text.includes("time") ||
    text.includes("timing") ||
    text.includes("schedule")
  ) {
    return "We have online, offline, and hybrid training options. Batch timings depend on the selected course and current schedule.";
  }

  if (
    text.includes("placement") ||
    text.includes("job") ||
    text.includes("career")
  ) {
    return "Yes, we provide placement assistance, resume guidance, mock interviews, aptitude preparation, interview preparation, and job support.";
  }

  if (
    text.includes("contact") ||
    text.includes("advisor") ||
    text.includes("call") ||
    text.includes("phone")
  ) {
    return "You can call or WhatsApp us at +91 8885492139. You can also submit the contact form on this website.";
  }

  if (
    text.includes("location") ||
    text.includes("address") ||
    text.includes("ameerpet") ||
    text.includes("hyderabad")
  ) {
    return "Core Edge Academy is located in Ameerpet, Hyderabad. Contact our advisor for the exact location and current batch details.";
  }

  return "I don't have an instant answer for that question. Please contact our Core Edge Academy advisor on WhatsApp for detailed assistance.";
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
    ]);

    setInput("");
  };

  return (
    <>
      {/* =====================================================
          CHATBOT PANEL
          ===================================================== */}

      {isOpen && (
        <div
          className="floating-chat-panel"
          role="dialog"
          aria-label="Core Edge chatbot"
        >
          {/* Header */}
          <div className="floating-chat-head">
            <div className="chat-head-left">
              <span className="chat-avatar">
                <FaRobot />
              </span>

              <div>
                <h3>Core Edge Assistant</h3>
                <p>Usually replies instantly</p>
              </div>
            </div>

            <button
              type="button"
              className="chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
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

          {/* Quick Replies */}
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

          {/* Input */}
          <form
            className="chat-input-row"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
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

          {/* WhatsApp Button Inside Chatbot */}
          <a
            className="chat-whatsapp-link"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
            <span>Continue on WhatsApp</span>
          </a>
        </div>
      )}

      {/* =====================================================
          FLOATING BUTTONS
          ONLY SHOW WHEN CHATBOT IS CLOSED
          ===================================================== */}

      {!isOpen && (
        <div className="floating-chat-actions">

          {/* Chat Button */}
          <button
            type="button"
            className="chat-toggle-button"
            onClick={() => setIsOpen(true)}
            aria-label="Open chatbot"
          >
            <FaRobot />
            <span>Chat</span>
          </button>

          {/* WhatsApp Button */}
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
      )}
    </>
  );
}

export default FloatingWhatsApp;
