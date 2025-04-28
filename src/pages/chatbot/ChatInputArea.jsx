import React, { useState } from "react";
import Upload from "../../assets/search-icon.svg"; 
import Send from "../../assets/Send.svg";

function ChatInputArea({
  question,
  setQuestion,
  handleSend,
  historyOpen, 
  searchHistory,
  setSearchHistory, 
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
    if (e.target.value.trim() && searchHistory.length > 0) {
        setShowSuggestions(true);
    } else {
        setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
      setQuestion(suggestion);
      setShowSuggestions(false);
      // Optionally trigger send immediately:
      // handleSend(suggestion); // Pass suggestion to handleSend if needed
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && question.trim()) {
        e.preventDefault();
        setSearchHistory((prev) =>
          [question, ...prev.filter((q) => q !== question)].slice(0, 5) 
        );
        handleSend(); 
        setShowSuggestions(false);
    } else if (e.key === 'Escape') {
        setShowSuggestions(false);
    }
  };

  const filteredSuggestions = searchHistory.filter(item =>
    item.toLowerCase().includes(question.toLowerCase()) && item !== question
  );


  return (
    <div
      className={`p-4 bg-white border-t border-[#DDDFE3] transition-all duration-500 ease-in-out ${
        historyOpen ? "pl-[68px]" : "pl-4"
      }`}
    >
      <div className="relative w-full max-w-[700px] mx-auto">
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="absolute bottom-full left-0 mb-1 bg-white border border-[#DDDFE3] rounded-md w-full z-10 max-h-40 overflow-auto shadow-lg">
            {filteredSuggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(item)}
                className="px-3 py-2 hover:bg-[#F0F1FA] cursor-pointer text-[#555] text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        <input
          type="text"
          value={question}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => question.trim() && filteredSuggestions.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="Type your question..."
          className="w-full pl-10 pr-12 bg-[#F0F1FA] py-3 rounded-md border border-[#DDDFE3] h-[80px] text-[#101010] placeholder-[#A2A29F] focus:outline-none focus:border-[#009DE9] transition resize-none text-sm leading-tight pt-3" // Use py-3, pt-3, resize-none for better textarea feel
          style={{ paddingBottom: '2.5rem' }} 
        />

        <label className="absolute left-3 bottom-3 text-gray-500 cursor-pointer hover:text-[#009DE9]">
          <input type="file" className="hidden" />
          <img src={Upload} alt="Upload" className="w-5 h-5" />
        </label>

        <button
          onClick={() => {
               if (!question.trim()) return;
               setSearchHistory((prev) =>
                [question, ...prev.filter((q) => q !== question)].slice(0, 5)
               );
               handleSend();
               setShowSuggestions(false);
          }}
          disabled={!question.trim()}
          className="absolute right-3 bottom-3 text-[#009DE9] hover:text-[#007AC2] transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img src={Send} alt="Send" className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}

export default ChatInputArea;