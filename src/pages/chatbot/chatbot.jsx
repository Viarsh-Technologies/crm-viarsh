import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Corrected: Only useNavigate is needed here
import { Plus } from "lucide-react";

import PageTitle from "../../components/layout/PageTitle"; // Assuming path is correct

// Assuming these components are in the same directory or paths are correct
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import ProjectListCard from "./ProjectListCard";
import Modal from "./Modal";
import { initialChats, presetQA } from "./mockData"; // Assuming path is correct

function Chatbot() {
  // --- State ---
  const [chats, setChats] = useState(initialChats);
  const [selectedChatId, setSelectedChatId] = useState(initialChats[0]?.id); // Select first chat initially if available
  const [taskTitle, setTaskTitle] = useState("Lorem ipsum dolor sit amet,"); // Example title
  const [messages, setMessages] = useState([]); // Start with empty messages, add welcome on selection
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isExpandModalOpen, setIsExpandModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open by default

  // --- Refs ---
  const messagesEndRef = useRef(null);

  // --- Hooks ---
  const navigate = useNavigate();

  // --- Helper Functions for Nested Chat/Folder Structure ---

  // Finds an item and its parent array by ID within the nested structure
  const findItemAndParent = useCallback((items, id) => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.id === id) {
        return { item, parent: items, index: i };
      }
      if (item.type === "folder" && item.children) {
        const foundInChildren = findItemAndParent(item.children, id);
        if (foundInChildren) {
          // Return the found item, but the parent is the children array
          return { ...foundInChildren, parent: item.children, index: foundInChildren.index };
        }
      }
    }
    // Check top-level explicitly if not found in children loop (handles finding top-level folders/chats)
    const topLevelItemIndex = items.findIndex(item => item.id === id);
     if (topLevelItemIndex !== -1) {
       return { item: items[topLevelItemIndex], parent: items, index: topLevelItemIndex };
     }

    return null;
  }, []); // No dependencies, function is pure based on arguments

  // Recursively updates an item by ID
   const updateItemRecursively = useCallback((items, id, updateFn) => {
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
  }, []); // updateFn is not stable, but useCallback is still useful here

  // Recursively deletes an item by ID
  const deleteItemRecursively = useCallback((items, id) => {
    return items.filter((item) => {
      if (item.id === id) {
        return false; // Filter out the item to be deleted
      }
      if (item.type === "folder" && item.children) {
        // Recursively delete within children and update the children array
        item.children = deleteItemRecursively(item.children, id);
      }
      return true; // Keep the item
    });
  }, []);

  // Assigns new UUIDs to an item and all its children (for duplication)
  const assignNewIds = useCallback((item) => {
      const newItem = { ...item, id: uuidv4() }; // Assign new ID to the current item
      if (newItem.type === "folder" && newItem.children) {
        // Recursively assign new IDs to children
        newItem.children = newItem.children.map(child => assignNewIds(child));
      }
      return newItem;
  }, []);


  // --- Effects ---

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Effect to load initial/selected chat messages
  useEffect(() => {
      if (selectedChatId) {
          const selectedItemResult = findItemAndParent(chats, selectedChatId);
          const chatName = selectedItemResult?.item?.name || `Chat ${selectedChatId.substring(0, 4)}`;
          // Replace messages when chat switches - in a real app, you'd load saved messages here
          setMessages([
              {
                  id: uuidv4(),
                  sender: "bot",
                  text: `Switched to ${chatName}. How can I help?`,
              },
          ]);
          // Optionally update task title based on selected chat
          // setTaskTitle(`Task related to: ${chatName}`);
      } else {
          // No chat selected
          setMessages([]);
          // setTaskTitle("No Chat Selected");
      }
  }, [selectedChatId, chats, findItemAndParent]); // Add findItemAndParent dependency


  // --- Event Handlers ---

  // Handle selecting a chat from the sidebar
  const handleSelectChat = useCallback((id) => {
    setSelectedChatId(id);
    // Message update is handled by the useEffect hook reacting to selectedChatId change
  }, []);

  // Handle toggling folder open/closed state
  const handleToggleFolder = useCallback((id) => {
    setChats((prevChats) =>
      updateItemRecursively(prevChats, id, (item) => ({
        ...item,
        isOpen: !item.isOpen,
      }))
    );
  }, [updateItemRecursively]); // Add dependency

  // Handle renaming a chat or folder
  const handleRenameItem = useCallback((id, newName) => {
    setChats((prevChats) =>
      updateItemRecursively(prevChats, id, (item) => ({
        ...item,
        name: newName,
      }))
    );
    toast.success(`Renamed to "${newName}"`, { autoClose: 1500 });
  }, [updateItemRecursively]); // Add dependency

  // Handle deleting a chat or folder
  const handleDeleteItem = useCallback((id) => {
    let nextSelectedId = selectedChatId;

    // If the deleted item is the currently selected one, select another chat
    if (id === selectedChatId) {
        const allChatIds = [];
        const collectIds = (items) => {
            items.forEach(item => {
                if(item.type === 'chat') allChatIds.push(item.id);
                if(item.type === 'folder' && item.children) collectIds(item.children);
            });
        };
        collectIds(chats);

        const currentIndex = allChatIds.indexOf(id);
        const otherChatIds = allChatIds.filter(chatId => chatId !== id);

        if (otherChatIds.length > 0) {
            // Try to select the previous item, otherwise the first available
            nextSelectedId = otherChatIds[currentIndex - 1] || otherChatIds[0];
        } else {
            nextSelectedId = null; // No chats left
        }
    }

    setChats((prevChats) => deleteItemRecursively(prevChats, id));

    // Update selectedChatId *after* state update if necessary
     if (id === selectedChatId) {
       setSelectedChatId(nextSelectedId);
       if (nextSelectedId === null) {
           setMessages([]); // Clear messages if no chat is selected
       }
     }

    toast.error(`Item deleted (demo)`, { autoClose: 1500 });
  }, [selectedChatId, chats, deleteItemRecursively]); // Add dependencies

 // Handle duplicating a chat or folder
  const handleDuplicateItem = useCallback((id) => {
    setChats((prevChats) => {
        const currentChats = [...prevChats]; // Create mutable copy
        const found = findItemAndParent(currentChats, id);

        if (found) {
            const { item, parent, index } = found;

            // Deep clone and assign new IDs
            const duplicatedItem = assignNewIds(JSON.parse(JSON.stringify(item)));
            duplicatedItem.name = `${item.name} (Copy)`; // Update name

            // Insert the duplicated item right after the original
            parent.splice(index + 1, 0, duplicatedItem);

            toast.info(`"${item.name}" duplicated (demo)`, { autoClose: 1500 });
            return currentChats; // Return the updated array
        }
        return prevChats; // Return original if item not found
    });
  }, [findItemAndParent, assignNewIds]); // Add dependencies


  // Handle sending a message from the input
  const handleSendMessage = useCallback((text) => {
    if (!text.trim()) return; // Don't send empty messages

    const userMessage = { id: uuidv4(), sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setIsBotTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const lowerCaseText = text.toLowerCase().trim();
      const answer =
        presetQA[lowerCaseText] ||
        "Sorry, I don't understand that question yet. (Demo Response)";
      const botMessage = { id: uuidv4(), sender: "bot", text: answer };

      setIsBotTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 1000 + Math.random() * 500); // Simulate network delay
  }, []); // No dependencies needed here if presetQA is stable

  // --- Top Bar Actions ---
  const handleTitleChange = useCallback((newTitle) => {
    setTaskTitle(newTitle);
    toast.info("Task title updated (client-side)", { autoClose: 1500 });
  }, []);

  const handleShare = useCallback(() => {
    setIsShareModalOpen(true);
  }, []);

  const handleSave = useCallback(() => {
    toast.success("Task saved (demo mode)", { autoClose: 2000 });
    // In a real app, you would send data to your backend here
  }, []);

  // --- Card Actions ---
  const handleExpandCard = useCallback(() => {
    setIsExpandModalOpen(true);
  }, []);

  // --- Page Title Action ---
  const handleNewChatAction = useCallback(() => {
    // Option 1: Navigate away (as in original code)
    // navigate("/");

    // Option 2: Create a new chat within this component (Example)
     const newChatId = uuidv4();
     const newChat = {
       id: newChatId,
       type: 'chat',
       name: 'New Chat',
       // Add any other properties needed for a chat item
     };
     setChats(prevChats => [newChat, ...prevChats]); // Add to the beginning of the root level
     setSelectedChatId(newChatId); // Select the new chat
     toast.success("New chat created!", { autoClose: 1500 });

  }, [navigate]); // Add navigate if using Option 1

  // --- Sidebar Toggle ---
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  // --- Welcome Message Component ---
  const WelcomeMessage = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-8">
      {/* Optional: Add an icon or logo */}
      {/* <img src="/path/to/your/logo.png" alt="Welcome" className="w-16 h-16 mb-4" /> */}
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">
          {selectedChatId ? "Start Chatting!" : "Select or Create a Chat"}
      </h2>
      <p className="text-gray-600">
          {selectedChatId
            ? "How can I assist you with this topic?"
            : "Choose a chat from the sidebar or create a new one to begin."}
      </p>
      {selectedChatId && (
          <p className="text-sm mt-4">Type your first message below.</p>
      )}
       {!selectedChatId && chats.length === 0 && (
          <p className="text-sm mt-4">Click the '+' button above to create your first chat.</p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50"> {/* Ensure full height */}
      <PageTitle
        title={"Chatbot"}
        actionText="New Chat"
        ActionIcon={Plus}
        onAction={handleNewChatAction} // Use the new chat handler
      />

      <div className="border-t border-gray-300"> {/* Separator */}
        <TopBar
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          taskTitle={taskTitle}
          onTitleChange={handleTitleChange}
          onShare={handleShare}
          onSave={handleSave}
        />
      </div>

      <div className="flex flex-1 overflow-hidden"> {/* Flex container for sidebar + main */}
        <ToastContainer position="bottom-right" theme="colored" />

        {/* Sidebar: Conditionally rendered based on isSidebarOpen */}
         <AnimatePresence>
            {isSidebarOpen && (
                 <motion.div
                    initial={{ width: 0, opacity: 0, marginRight: 0 }}
                    animate={{ width: 288, opacity: 1, marginRight: 0 }} // lg:w-72 = 288px
                    exit={{ width: 0, opacity: 0, marginRight: -16 }} // Negative margin pull effect
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden flex-shrink-0" // Prevent shrinking below content size
                  >
                    <Sidebar
                        // Pass isOpen state for internal logic if needed, though visibility is handled here
                        // isOpen={isSidebarOpen}
                        chats={chats}
                        selectedChatId={selectedChatId}
                        onSelectChat={handleSelectChat}
                        onToggleFolder={handleToggleFolder}
                        onRenameItem={handleRenameItem}
                        onDeleteItem={handleDeleteItem}
                        onDuplicateItem={handleDuplicateItem}
                        // Ensure Sidebar itself has appropriate styling e.g., width, height, bg
                        className="h-full w-72 border-r border-gray-300 bg-white" // Example styling
                    />
                 </motion.div>
            )}
        </AnimatePresence>


        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white"> {/* flex-1 allows it to take remaining space */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col">
            {/* Chat Messages Area */}
            <div className="flex-grow mb-4 space-y-4"> {/* Use space-y for spacing between messages */}
                {/* Conditional Rendering: Show Welcome or Messages */}
                {messages.length === 0 && !isBotTyping && <WelcomeMessage />}

                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        layout // Animate layout changes (e.g., when messages appear/disappear)
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      >
                          <ChatMessage
                              message={msg}
                              // isTyping prop is only relevant for the bot typing indicator
                              // isTyping={isBotTyping && msg.sender === 'bot' && msg.id === 'typing-indicator'} // Example logic if needed inside ChatMessage
                          />
                      </motion.div>
                    ))}
                </AnimatePresence>

                {/* Bot Typing Indicator */}
                {isBotTyping && (
                   <motion.div
                      key="typing-indicator"
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                        <ChatMessage
                            message={{ id: "typing", sender: "bot", text: "" }} // Empty text for typing
                            isTyping={true} // Pass explicit typing prop
                        />
                    </motion.div>
                )}

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
            </div>

            {/* Project List Card (Optional) */}
            {selectedChatId && <ProjectListCard onExpand={handleExpandCard} />}

          </main>

          {/* Message Input Area - Only show if a chat is selected */}
          {selectedChatId && (
              <div className="border-t border-gray-200 p-4">
                <MessageInput
                  onSendMessage={handleSendMessage}
                  isBotTyping={isBotTyping}
                  disabled={!selectedChatId} // Disable if no chat selected
                />
              </div>
          )}
        </div>
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
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
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
          Placeholder for expanded content... list items, details, etc. You could
          fetch more data or display more details about the items shown in the
          ProjectListCard here.
        </div>
      </Modal>
    </div>
  );
}

export default Chatbot;