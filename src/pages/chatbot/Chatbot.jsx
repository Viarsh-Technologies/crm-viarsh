import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PageTitle from "../../components/layout/PageTitle";
import Breadcrumbs from "../../components/layout/Breadcrumbs";

import ChatTopBar from "./ChatTopBar";
import ChatSidebar from "./ChatSidebar";
import ChatMessagesArea from "./ChatMessagesArea";
import ChatInputArea from "./ChatInputArea";

const breadcrumbItems = [{ name: "Chatbot", path: "" }];

function Chatbot() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const navigate = useNavigate();


  const handleSend = (optionalQuestion) => {
    const queryToSend = (typeof optionalQuestion === 'string' ? optionalQuestion : question).trim();
    if (!queryToSend) return;

    const newMessage = {
      question: queryToSend,
      answer: `This is a sample answer`,
    };

    setMessages((prev) => [...prev, newMessage]);
    setQuestion("");
    setShowWelcome(false);
    setExpandedIndex(null);
  };

  const handleNewChat = () => {
    setShowWelcome(true);
    setMessages([]);
    setQuestion("");
    setExpandedIndex(null);
    setHistoryOpen(false);
    // navigate("/chatbot");
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full"
    >
      <div className="max-w-[1140px] ">
        <PageTitle
          title={"Chatbot"}
          actionText="New Chat"
          ActionIcon={Plus}
          onAction={handleNewChat} 
        />
        <div>
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="flex flex-col font-sans transition-all duration-500 ease-in-out mt-1 border border-[#DDDFE3] rounded-lg overflow-hidden"> {/* Added mt-4, shadow, rounded */}

          <ChatTopBar
            historyOpen={historyOpen}
            setHistoryOpen={setHistoryOpen}
            messages={messages}
          />

          <div className="flex w-full h-[calc(100vh-250px)] min-h-[550px] overflow-hidden relative bg-white">

            {/* Sidebar */}
            <ChatSidebar
              historyOpen={historyOpen}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchHistory={searchHistory}
              messages={messages}
              expandedIndex={expandedIndex}
              setQuestion={setQuestion}
              question={question} 
              handleSend={handleSend} 
            />

            <div
              className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${
                historyOpen ? "ml-[330px]" : "ml-0" 
              }`}
            >
              <ChatMessagesArea
                showWelcome={showWelcome}
                messages={messages}
                historyOpen={historyOpen}
                expandedIndex={expandedIndex}
                setExpandedIndex={setExpandedIndex}
              />

              {expandedIndex === null && (
                <ChatInputArea
                  question={question}
                  setQuestion={setQuestion}
                  handleSend={handleSend}
                  historyOpen={historyOpen}
                  searchHistory={searchHistory}
                  setSearchHistory={setSearchHistory}
                />
              )}
            </div>
          </div>
        </div>
      </div>

       <style>
          {`
           /* Add any specific non-Tailwind/Framer Motion styles here if absolutely necessary */
           /* Example: Custom scrollbar */
           .overflow-y-auto::-webkit-scrollbar {
             width: 6px;
           }
           .overflow-y-auto::-webkit-scrollbar-thumb {
             background-color: #ccc;
             border-radius: 3px;
           }
           .overflow-y-auto::-webkit-scrollbar-track {
             background-color: #f0f1fa;
           }
         `}
       </style>
    </motion.div>
  );
}

export default Chatbot;