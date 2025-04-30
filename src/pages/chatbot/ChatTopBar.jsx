import React from "react";
import ChatbotSidebar from "../../assets/chatbot-sidebar.svg";
import { motion } from "framer-motion";

function ChatTopBar({ historyOpen, setHistoryOpen, messages }) {
  return (
    <div
      className={`bg-[#F0F1FA] border border-[#DDDFE3] text-[#37352F] p-4 max-w-[1140px] relative transition-all duration-500 ${
        historyOpen ? "pl-64" : "pl-0"
      }`}
    >
      <button
        onClick={() => setHistoryOpen(!historyOpen)}
        className="hover:text-[#009DE9] transition text-xl absolute left-4 top-1/2 -translate-y-1/2 z-30"
      >
        <img
          src={ChatbotSidebar}
          alt="Chatbot Sidebar Toggle"
          className="w-5 h-5"
        />
      </button>

      <div className="flex items-center justify-between transition-all duration-300">
        <div
          className={`transition-all duration-500 ${
            historyOpen ? "text-center w-full" : "text-left ml-8 pl-9" 
          }`}
        >
          <h1 className="text-lg font-semibold text-[#37352F]">
            Lorem ipsum dolor sit amet,
          </h1>
        </div>

        {messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-x-2 flex flex-shrink-0 ml-4"
          >
            <button className="border border-[#DDDFE3] text-[#009DE9] px-4 py-1 rounded hover:text-[#007AC2] transition-all text-sm">
              Share
            </button>
            <button className="border border-[#DDDFE3] text-[#009DE9] px-4 py-1 rounded hover:text-[#007AC2] transition-all text-sm">
              Save Task
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ChatTopBar;