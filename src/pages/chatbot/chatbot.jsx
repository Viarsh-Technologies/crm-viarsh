import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import PageTitle from "../../components/layout/PageTitle";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import ProjectListCard from "./ProjectListCard";
import Modal from "./Modal";
import { initialChats, presetQA } from "./mockData";

function Chatbot() {
  const [chats, setChats] = useState(initialChats);
  const [selectedChatId, setSelectedChatId] = useState(initialChats[0]?.id);
  const [taskTitle, setTaskTitle] = useState("Lorem ipsum dolor sit amet,");
  const [messages, setMessages] = useState([
    {
      id: uuidv4(),
      sender: "bot",
      text: "Welcome! Ask me about the project or tasks.",
    },
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isExpandModalOpen, setIsExpandModalOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const findItemAndParent = (items, id) => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.id === id) {
        return { item, parent: items, index: i };
      }
      if (item.type === "folder" && item.children) {
        const foundInChildren = findItemAndParent(item.children, id);
        if (foundInChildren) {
          return foundInChildren;
        }
      }
    }
    return null;
  };

  const updateItemRecursively = (items, id, updateFn) => {
    return items.map((item) => {
      if (item.id === id) {
        return updateFn(item);
      }
      if (item.type === "folder" && item.children) {
        return {
          ...item,
          children: updateItemRecursively(item.children, id, updateFn),
        };
      }
      return item;
    });
  };

  const deleteItemRecursively = (items, id) => {
    return items.filter((item) => {
      if (item.id === id) {
        return false;
      }
      if (item.type === "folder" && item.children) {
        item.children = deleteItemRecursively(item.children, id);
      }
      return true;
    });
  };

  const handleSelectChat = (id) => {
    setSelectedChatId(id);
    setMessages([
      {
        id: uuidv4(),
        sender: "bot",
        text: `Switched to chat ${
          findItemAndParent(chats, id)?.item?.name || id
        }. How can I help?`,
      },
    ]);
    const selectedItem = findItemAndParent(chats, id)?.item;
    if (selectedItem) {
      // Example: Append chat name to a base title
      // setTaskTitle(`Task related to: ${selectedItem.name}`);
    }
  };

  const handleToggleFolder = (id) => {
    setChats((prevChats) =>
      updateItemRecursively(prevChats, id, (item) => ({
        ...item,
        isOpen: !item.isOpen,
      }))
    );
  };

  const handleRenameItem = (id, newName) => {
    setChats((prevChats) =>
      updateItemRecursively(prevChats, id, (item) => ({
        ...item,
        name: newName,
      }))
    );
    toast.success(`Renamed to "${newName}"`, { autoClose: 1500 });
  };

  const handleDeleteItem = (id) => {
    if (id === selectedChatId) {
      setSelectedChatId(
        chats.length > 1 ? chats.find((c) => c.id !== id)?.id : null
      );
      setMessages([]);
    }
    setChats((prevChats) => deleteItemRecursively(prevChats, id));
    toast.error(`Item deleted (demo)`, { autoClose: 1500 });
  };

  const handleDuplicateItem = (id) => {
    const found = findItemAndParent(chats, id);
    if (found) {
      const { item, parent, index } = found;
      const newItem = {
        ...JSON.parse(JSON.stringify(item)),
        id: uuidv4(), // New ID
        name: `${item.name} (Copy)`,
      };
      const assignNewIds = (folderItem) => {
        if (folderItem.type === "folder" && folderItem.children) {
          folderItem.id = uuidv4();
          folderItem.children = folderItem.children.map((child) =>
            assignNewIds(child)
          );
        } else if (folderItem.type === "chat") {
          folderItem.id = uuidv4();
        }
        return folderItem;
      };
      const duplicatedItem = assignNewIds(newItem);

      parent.splice(index + 1, 0, duplicatedItem);
      setChats([...chats]);
      toast.info(`"${item.name}" duplicated (demo)`, { autoClose: 1500 });
    }
  };

  const handleSendMessage = (text) => {
    const userMessage = { id: uuidv4(), sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setIsBotTyping(true);

    setTimeout(() => {
      const lowerCaseText = text.toLowerCase().trim();
      const answer =
        presetQA[lowerCaseText] ||
        "Sorry, I don't understand that question yet. (Demo Response)";
      const botMessage = { id: uuidv4(), sender: "bot", text: answer };

      setIsBotTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 1000 + Math.random() * 500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Top Bar Actions ---

  const handleTitleChange = (newTitle) => {
    setTaskTitle(newTitle);
    toast.info("Task title updated (client-side)", { autoClose: 1500 });
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  const handleSave = () => {
    toast.success("Task saved (demo mode)", { autoClose: 2000 });
  };

  // --- Card Actions ---
  const handleExpandCard = () => {
    setIsExpandModalOpen(true);
  };

  const onAction = () => {
    navigate("/");
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open

  // --- NEW: Function to toggle sidebar ---
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <PageTitle
        title={"Chatbot"}
        actionText="New Chat"
        ActionIcon={Plus}
        onAction={onAction}
      />
      <div>
        <TopBar
          onToggleSidebar={toggleSidebar} // NEW prop
          isSidebarOpen={isSidebarOpen}
          taskTitle={taskTitle}
          onTitleChange={handleTitleChange}
          onShare={handleShare}
          onSave={handleSave}
          onToggleSidebar={toggleSidebar} // NEW prop
          isSidebarOpen={isSidebarOpen}
        />

        <div className="flex h-screen overflow-hidden bg-white">
          <ToastContainer position="bottom-right" theme="colored" />

          <Sidebar
            isOpen={isSidebarOpen}
            chats={chats}
            selectedChatId={selectedChatId}
            onSelectChat={handleSelectChat}
            onToggleFolder={handleToggleFolder}
            onRenameItem={handleRenameItem}
            onDeleteItem={handleDeleteItem}
            onDuplicateItem={handleDuplicateItem}
          />

          <div className="flex-1 flex flex-col min-w-0">
            {/* Main Panel */}
            <main className="flex-1 overflow-y-auto p-6 flex flex-col">
              {/* Chat messages Area */}
              <div className="flex-grow mb-4">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <ChatMessage
                      key={msg.id}
                      message={msg}
                      isTyping={
                        isBotTyping &&
                        msg.id === messages[messages.length - 1].id
                      }
                    />
                  ))}
                  {isBotTyping &&
                    !messages.find(
                      (m) => m.sender === "bot" && m.text === "Typing..."
                    ) && (
                      <ChatMessage
                        key="typing-indicator"
                        message={{ id: "typing", sender: "bot", text: "" }}
                        isTyping={true}
                      />
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              <ProjectListCard onExpand={handleExpandCard} />
            </main>

            <MessageInput
              onSendMessage={handleSendMessage}
              isBotTyping={isBotTyping}
            />
          </div>

          {/* Modals */}
          <Modal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            title="Share Task (Demo)"
          >
            <p className="text-gray-600 mb-4">
              This is where sharing options would appear.
            </p>
            <button
              onClick={() => {
                toast.info("Sharing link copied! (Demo)");
                setIsShareModalOpen(false);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Copy Link (Demo)
            </button>
          </Modal>
          <Modal
            isOpen={isExpandModalOpen}
            onClose={() => setIsExpandModalOpen(false)}
            title="Expanded Project List (Demo)"
          >
            <p className="text-gray-600 mb-4">
              This modal simulates expanding the 'Project List' card content.
            </p>
            <div className="h-64 bg-gray-100 border rounded p-4 overflow-auto">
              Placeholder for expanded content... list items, details, etc.
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
