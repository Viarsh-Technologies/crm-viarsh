import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

const MessageInput = ({ onSendMessage, isBotTyping }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isBotTyping) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-2 w-full md:w-3/4 border rounded-[10px] border-gray-300"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question or type a message..."
          className="flex-grow px-4 py-5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
          disabled={isBotTyping}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className={`p-2.5 rounded-full text-white transition-colors ${
            inputValue.trim() && !isBotTyping
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!inputValue.trim() || isBotTyping}
          aria-label="Send message"
        >
          <FiSend size={18} />
        </motion.button>
      </form>
    </div>
  );
};

export default MessageInput;
