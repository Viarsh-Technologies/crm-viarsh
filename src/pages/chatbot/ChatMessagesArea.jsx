import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Work from "../../assets/work.svg";
import Expand from "../../assets/expand.svg";
import { FiThumbsUp, FiThumbsDown, FiRefreshCw, FiUpload } from "react-icons/fi";

function ChatMessagesArea({
  showWelcome,
  messages,
  historyOpen,
  expandedIndex,
  setExpandedIndex,
}) {
  return (
    <div className="flex-1 p-3 overflow-y-auto space-y-6 bg-white transition-all duration-300 ease-in-out">
      <AnimatePresence>
        {showWelcome ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center h-full text-center space-y-3"
          >
            <div className="text-6xl">👋</div>
            <span className="text-[55px] font-medium text-gray-800">
              Hello again
            </span>
            <p className="text-gray-500 max-w-md text-[18px]">
              Tell me what’s on your mind, or pick a suggestion.
            </p>
          </motion.div>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }} 
              className="space-y-6"
            >
              <div
                className={`flex justify-${historyOpen ? "end" : "center ml-180"} transition-all duration-300`}
              >
                {expandedIndex !== index && (
                  <div
                    className={`bg-[#DDDFE3] text-[#101010]  rounded-xl px-4 py-3 md:max-w-[371px]`}
                  >
                    {msg.question}
                  </div>
                )}
              </div>

              <div
                className={`flex justify-${historyOpen ? "start" : "center"} transition-all duration-300`}
              >
                <motion.div
                  layout 
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`border border-border rounded-2xl bg-white overflow-hidden ${
                    expandedIndex === index
                      ? "w-full h-125"
                      : "max-w-[80%] sm:max-w-[85%]" 
                  }`}
                  style={{ minHeight: expandedIndex === index ? "400px" : "auto" }} 
                >
                  <div className="flex items-center justify-between bg-second-bg rounded-t-xl px-4 py-2 border-b border-border">
                    <div className="flex items-center gap-3">
                      <img
                        src={Work}
                        alt="work-icon"
                        className="w-5 h-5"
                      />
                      <h1 className="text-base font-semibold text-[#101010]">
                        Project List 
                      </h1>
                    </div>
                    <img
                      src={Expand}
                      alt="expand-icon"
                      className={`w-6 h-6 cursor-pointer transition-transform duration-300 ${
                        expandedIndex === index ? "rotate-180" : "" 
                      }`}
                      onClick={() =>
                        setExpandedIndex(expandedIndex === index ? null : index)
                      }
                    />
                  </div>

                  <motion.div
                    layout 
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="text-[#37352F] rounded-b-lg px-4 py-4 h-[358px] w-[692px]"
                    style={{
                      maxHeight: expandedIndex === index ? "" : "300px",
                      overflow: expandedIndex === index ? "auto" : "hidden",
                    }}
                  >
                    <div className="whitespace-pre-wrap text-sm">
                      
                      {msg.answer}
                      {expandedIndex === index && (
                        <p className="mt-4">
                          {" "}
                          <br />
                          Lorem ipsum dolor sit
                          amet consectetur adipisicing elit. Quisquam, voluptatum.
                          Expedita ratione Eaque facilis provident officiis quasi
                          possimus quam culpa? Reprehenderit, quidem! Quas!
                        </p>
                      )}

                      
                    </div>
                    
                  </motion.div>
                </motion.div>
              </div>
              <div className="flex justify-center ml-140 gap-4 text-gray-500">
  <FiThumbsUp className="cursor-pointer hover:text-black transition" />
  <FiThumbsDown className="cursor-pointer hover:text-black transition" />
  <FiRefreshCw className="cursor-pointer hover:text-black transition" />
  <FiUpload className="cursor-pointer hover:text-black transition" />
</div>


            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatMessagesArea;
