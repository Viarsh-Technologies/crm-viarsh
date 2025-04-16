import { useState } from "react";
import { FiSend, FiSearch } from "react-icons/fi";
import ChatbotSidebar from "../assets/chatbot-sidebar.svg";
import Upload from "../assets/search-icon.svg";
import Send from "../assets/Send.svg";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/layout/PageTitle";

function Dummy() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(true);
  const navigate = useNavigate();


  const handleSend = () => {
    if (!question.trim()) return;
    const newMessage = { question, answer: "Plz Check your Internet Connection" };
    setMessages((prev) => [...prev, newMessage]);
    setQuestion("");
    setShowWelcome(false);
  };

  const onAction = () => {
    navigate('/chatbot');
}

  return (
    <div className="">
      <PageTitle
        title={"Chatbot"}
        actionText="New Chat"
        ActionIcon={Plus}
        onAction={onAction} // Use the new chat handler
      />
    
    <div className="flex-col font-sans transition-all duration-500 ease-in-out mt-4">
      
      <div
        className={`bg-[#F0F1FA] border border-[#DDDFE3] text-[#37352F] p-4 max-w-[1140px] relative transition-all duration-500 ${
          historyOpen ? "pl-64" : "pl-0"
        }`}
      >
        <button
          onClick={() => setHistoryOpen(!historyOpen)}
          className="hover:text-[#009DE9] transition text-xl absolute left-4 top-1/2 -translate-y-1/2"
        >
          <img src={ChatbotSidebar} alt="Chatbot Sidebar" className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between transition-all duration-300">
          <div className={`transition-all duration-500 ${historyOpen ? "text-center" : "text-left"}`}>
            <h1 className="text-lg font-semibold ml-8 pl-9 text-[#37352F]">
              Lorem ipsum dolor sit amet,
            </h1>
          </div>

          <div className="space-x-2 flex">
            <button className="border border-[#DDDFE3] text-[#009DE9] px-4 py-1 rounded hover:text-[#007AC2] transition-all">
              Share
            </button>
            <button className="border border-[#DDDFE3] text-[#009DE9] px-4 py-1 rounded hover:text-[#007AC2] transition-all">
              Save Task
            </button>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="flex w-full max-w-[1140px] border border-[#DDDFE3] h-[795px] overflow-hidden relative bg-white transition-all duration-500">
        {/* Sidebar */}
        <div
          className={`bg-white w-64 h-full border-r border-[#DDDFE3] transition-transform duration-500 ease-in-out absolute left-0 z-20 ${
            historyOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        >
          <div className="p-4 font-semibold flex justify-between">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search Chat..."
                className="w-full border border-[#DDDFE3] p-2 pl-7 rounded-[4px] text-[#A2A29F] focus:outline-none"
              />
              <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#A2A29F] text-[18px]" />
            </div>
          </div>

          <ul className="p-4 space-y-2 overflow-y-auto h-[calc(100%-60px)]">
            {messages.map((msg, index) => (
              <li
                key={index}
                className="text-sm text-[#101010] truncate hover:text-[#009DE9] cursor-pointer transition-colors"
              >
                {msg.question}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div
          className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${
            historyOpen ? "ml-64" : "ml-0"
          }`}
        >
          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-white transition-all duration-300 ease-in-out">
            {showWelcome ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 animate-fadeIn">
                <div className="text-6xl">👋</div>
                <span className="text-2xl font-semibold text-gray-800">Hello again</span>
                <p className="text-gray-500 max-w-md">
                  Tell me what’s on your mind, or pick a suggestion.
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className="space-y-2 animate-fadeIn transition-all duration-300 ease-in-out"
                >
                  <div className="flex justify-end">
                    <div className="bg-[#DDDFE3] text-[#101010] rounded-lg px-4 py-2 max-w-[350px] shadow-md">
                      {msg.question}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-[#F0F1FA] text-[#37352F] rounded-lg px-4 py-2 max-w-md shadow">
                      {msg.answer}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Field */}
          <div className="p-4 border-t border-[#DDDFE3]">
            <div className="relative w-full max-w-[700px] mx-auto transition-all">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your question..."
                className="w-full pl-3 bg-[#F0F1FA] pb-9 rounded-md border border-[#DDDFE3] h-[80px] text-[#101010] placeholder-[#A2A29F] focus:outline-none transition"
              />

              {/* Upload */}
              <label className="absolute left-3 bottom-3 text-gray-500 cursor-pointer">
                <input type="file" className="hidden" />
                <img src={Upload} alt="Upload" className="w-5 h-5" />
              </label>

              {/* Send */}
              <button
                onClick={handleSend}
                className="absolute right-3 bottom-3 text-[#009DE9] hover:text-[#007AC2] transition-transform hover:scale-105"
              >
                <img src={Send} alt="Send" className="w-7 h-7" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animation CSS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeIn {
            animation: fadeIn 0.4s ease-in-out;
          }
        `}
      </style>
    </div>
    </div>
  );
}

export default Dummy;
