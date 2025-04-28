import React from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import Upload from "../../assets/search-icon.svg"; 
import Send from "../../assets/Send.svg";

function ChatSidebar({
  historyOpen,
  searchQuery, 
  setSearchQuery,
  searchHistory,
  messages,
  expandedIndex,
  setQuestion,
  question,
  handleSend,
}) {
  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: -330, opacity: 0 },
  };

  return (
    <motion.div
      variants={sidebarVariants}
      initial="closed"
      animate={historyOpen ? "open" : "closed"}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white w-[330px] h-full border-r border-[#DDDFE3] absolute left-0 top-0 z-20 flex flex-col" 
      style={{ position: "absolute" }}
    >
      <div className="p-4 ">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Search Chat..."
            // value={searchQuery} // Uncomment if you implement search filtering
            // onChange={(e) => setSearchQuery(e.target.value)} // Uncomment if you implement search filtering
            className="w-full border border-[#DDDFE3] p-2 pl-7 rounded-[4px] text-sm text-[#37352F] placeholder-[#A2A29F] focus:outline-none focus:border-[#009DE9]"
          />
          <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#A2A29F] text-[18px]" />
        </div>
      </div>

      <ul className="p-4 space-y-2 overflow-y-auto h-[calc(100%-60px)]">
                <div>Recent chats</div>
  {expandedIndex === null && searchHistory.length > 0 ? (
    searchHistory.map((item, index) => (
      <li
        key={index}
        onClick={() => setQuestion(item)}
        className=" cursor-pointer text-[#555] truncate rounded"
      >
        {item}
      </li>
    ))
  ) : (
    messages.map((msg, index) => {
      const isExpanded = expandedIndex === index;
      return (
        <li
          key={index}
          className={`${
            isExpanded ? "font-normal text-[#009DE9]" : ""
          }`}
        >
          {isExpanded ? (
            <div className="bg-second-bg text-[#101010] font-[16px] px-3 py-2 max-w-[500px] rounded-2xl h-auto overflow-auto whitespace-normal">
              {msg.question}
            </div>
          ) : null}
        </li>
      );
    })
  )}
      </ul>

      {expandedIndex !== null && (
        <div className="p-4 border-[#DDDFE3] bg-white">
          <div className="relative w-full">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && question.trim() && handleSend()}
              placeholder="Ask a follow-up..."
              className="w-full pl-3 pr-10 bg-[#F0F1FA] pb-9 rounded-md border border-[#DDDFE3] h-[80px] text-[#101010] placeholder-[#A2A29F] focus:outline-none transition"
            />
            <label className="absolute left-3 bottom-3 text-gray-500 cursor-pointer">
              <input type="file" className="hidden" />
              <img src={Upload} alt="Upload" className="w-5 h-5" />
            </label>
            <button
              onClick={handleSend}
              disabled={!question.trim()}
              className="absolute right-3 bottom-3 text-[#009DE9] hover:text-[#007AC2] transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img src={Send} alt="Send" className="w-7 h-7" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ChatSidebar; 
 
 
 
 
 
 
 
 
 