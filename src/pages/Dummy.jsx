import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";

function Dummy() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(true);

  const handleSend = () => {
    if (!question.trim()) return;
    const newMessage = { question, answer: "Yeh ek dummy answer hai." };
    setMessages((prev) => [...prev, newMessage]);
    setQuestion("");
    setShowWelcome(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      {/* Header */}
      <div
        className={`bg-blue-600 text-white p-4 w-full max-w-[1140px] relative transition-all duration-500 ${
          historyOpen ? "pl-64" : "pl-0"
        }`}
      >
        <button
          onClick={() => setHistoryOpen(!historyOpen)}
          className="text-white hover:text-blue-200 transition text-xl absolute left-4 top-1/2 -translate-y-1/2"
        >
          <TbLayoutSidebarLeftCollapseFilled />
        </button>
        <div
          className={`transition-all duration-500 ${
            historyOpen ? "text-center" : "text-left"
          }`}
        >
          <h1 className="text-lg font-semibold ml-8 pl-9">Dummy Chatbot</h1>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex w-full max-w-[1140px] h-[795px] rounded-xl overflow-hidden shadow-lg relative bg-white">
        {/* Sidebar */}
        {historyOpen && (
          <div className="bg-white w-64 h-full border-r shadow transition-all duration-500 ease-in-out absolute left-0 z-10">
            <div className="p-4 font-semibold border-b flex justify-between">
              <span>History</span>
            </div>
            <ul className="p-4 space-y-2 overflow-y-auto h-[calc(100%-60px)]">
              {messages.map((msg, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 truncate hover:text-blue-600 cursor-pointer"
                >
                  {msg.question}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Chat Content */}
        <div
          className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${
            historyOpen ? "ml-64" : "ml-0"
          }`}
        >
          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-white">
            {showWelcome ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                <div className="text-6xl">👋</div>
                <span className="text-2xl font-semibold text-gray-800">
                  Hello again
                </span>
                <p className="text-gray-500 max-w-md">
                  Tell me what’s on your mind, or pick a suggestion.
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-right text-blue-600 font-medium">
                    You: {msg.question}
                  </div>
                  <div className="text-left text-gray-800">
                    Bot: {msg.answer}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Field */}
          <div className="p-4 border-t bg-white">
            <div className="relative w-full max-w-[700px] mx-auto">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your question..."
                className="w-full py-4 pl-5 pr-12 bg-[#F0F1FA] rounded-md border h-[80px] border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
              >
                <FiSend size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dummy;
