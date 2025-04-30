
// this code with dummy data, and logic --->(The code given in the comment below is backend ready)


import React, { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiTrash2,
  FiCopy,
  FiEdit2,
  FiExternalLink,
  FiLink,
  FiFolder,
  FiLock,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import Upload from "../../assets/search-icon.svg";
import Send from "../../assets/Send.svg";
import File from "../../assets/file.svg";
import Pluss from "../../assets/pluss.svg";
import ThreeDots from "../../assets/threeDots.svg";
import DropdownPortal from "../../components/common/DropdownPortal";

function ChatSidebar({
  historyOpen,
  searchQuery,
  setSearchQuery,
  searchHistory,
  messages,
  expandedIndex,
  setExpandedIndex,
  setQuestion,
  question,
  handleSend,
  setSearchHistory,
}) {
  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: -330, opacity: 0 },
  };

  const [childDropdownIndex, setChildDropdownIndex] = useState(null);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [renameIndex, setRenameIndex] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const dotRefs = useRef([]);

  useEffect(() => {
    dotRefs.current = dotRefs.current.slice(0, searchHistory.length);
  }, [searchHistory]);

  // Handle accordion expand/collapse
  const handleAccordionToggle = (index) => {
    setOpenAccordionIndex((prev) => (prev === index ? null : index));
    setChildDropdownIndex(null);
  };

  // Toggle dropdown menu visibility for 3-dot options
  const handleThreeDotsToggle = (index) => {
    setChildDropdownIndex((prev) => (prev === index ? null : index));
  };

  // Track selected dropdown option
  const handleOptionClick = (value) => {
    setSelectedOption(value);
  };

  // Delete a history entry by index
  const handleDeleteItem = (indexToDelete) => {
    const updatedHistory = searchHistory.filter((_, idx) => idx !== indexToDelete);
    setSearchHistory(updatedHistory);
    setChildDropdownIndex(null);
  };

  // Duplicate a history entry at the given index
  const handleDuplicateItem = (indexToDuplicate) => {
    const itemToDuplicate = searchHistory[indexToDuplicate];
    const updatedHistory = [
      ...searchHistory.slice(0, indexToDuplicate + 1),
      `${itemToDuplicate}`,
      ...searchHistory.slice(indexToDuplicate + 1),
    ];
    setSearchHistory(updatedHistory);
    setChildDropdownIndex(null);
  };

  // Enable rename mode for a specific history item
  const handleRenameItem = (index) => {
    setRenameIndex(index);
    setRenameValue(searchHistory[index]);
    setChildDropdownIndex(null);
  };

  // Submit updated name for the selected history item
  const handleRenameSubmit = () => {
    const updatedHistory = [...searchHistory];
    updatedHistory[renameIndex] = renameValue.trim() || searchHistory[renameIndex];
    setSearchHistory(updatedHistory);
    setRenameIndex(null);
    setRenameValue("");
  };
  

  return (
    <motion.div
      variants={sidebarVariants}
      initial="closed"
      animate={historyOpen ? "open" : "closed"}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-white w-[330px] h-full border-r border-[#DDDFE3] absolute left-0 top-0 z-20 flex flex-col"
    >
      {/* Search input */}
      <div className="p-4">
        <div className="relative w-full">
          <input
            type="search"
            placeholder="Search Chat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-[#DDDFE3] p-2 pl-7 rounded-[4px] text-sm text-[#37352F] placeholder-[#A2A29F] focus:outline-none focus:border-[#009DE9]"
          />
          <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#A2A29F] text-[18px]" />
        </div>
      </div>

      <ul className="p-4 space-y-2 overflow-y-auto h-[calc(100%-60px)]">
  <div className="text-sm text-[#777] mb-2">Recent chats</div>

  {expandedIndex === null && searchHistory.map((item, index) => {
  const isAccordionOpen = openAccordionIndex === index;
  const isChildDropdownOpen = childDropdownIndex === index;

  // dotRefs logic...
  if (!dotRefs.current[index]) {
    dotRefs.current[index] = React.createRef();
  }

  return (
    <div key={index} className="relative">
      <li className="cursor-pointer text-[#555] truncate rounded">
        {/* Accordion Header */}
        <div
          className="flex items-center justify-start space-x-2 w-full px-2 py-1 rounded transition"
          onClick={() => handleAccordionToggle(index)}
        >
          {isAccordionOpen ? (
            <IoIosArrowDown size={14} color="gray" />
          ) : (
            <IoIosArrowForward size={14} color="gray" />
          )}

          <div className="flex justify-between items-center w-full text-sm text-[#333]">
            <div
              className="flex items-center space-x-2 truncate"
              onClick={() => setQuestion(item)}
            >
              <img src={File} alt="file" className="w-4 h-4" />
              {renameIndex === index ? (
                <input
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onBlur={handleRenameSubmit}
                  onKeyDown={(e) => e.key === "Enter" && handleRenameSubmit()}
                  autoFocus
                  className="text-sm border border-gray-300 rounded px-1 py-0.5 w-full"
                />
              ) : (
                <span className="truncate">{item}</span>
              )}
            </div>

            {/* Three Dots & Plus */}
            <div className="relative flex items-center space-x-2 ml-4">
              <img
                ref={dotRefs.current[index]}
                src={ThreeDots}
                alt="dots"
                onClick={(e) => {
                  e.stopPropagation();
                  handleThreeDotsToggle(index);
                }}
                className="cursor-pointer bg-[#F1F1F0] rounded-[3px] p-[6px]"
              />
              <img src={Pluss} alt="plus" className="cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Accordion Content */}
        {isAccordionOpen && (
          <div className="px-4 py-2 mt-1 space-y-1 rounded text-sm text-[#333]">
            {["Sample 1", "Sample 2", "Sample 3"].map((sample, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center cursor-pointer px-2 py-1 rounded"
                onClick={() => handleOptionClick(`${item} - ${sample}`)}
              >
                <span>{sample}</span>
                <FiLock className="text-gray-400" />
              </div>
            ))}
          </div>
        )}

        {/* Dropdown Portal */}
        {isChildDropdownOpen && (
          <DropdownPortal targetRef={dotRefs.current[index]}>
            <div className="bg-white border border-border rounded-md shadow-[5px_5px_8px_0px_rgba(0,0,0,0.2)] w-56">
              <div
                className="flex items-center px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDeleteItem(index)}
              >
                <FiTrash2 className="mr-2" />
                Delete
              </div>
              <div
                className="flex items-center px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDuplicateItem(index)}
              >
                <FiCopy className="mr-2" />
                Duplicate
              </div>
              <div className="flex items-center px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                <FiEdit2 className="mr-2" />
                Rename
              </div>
              <hr className="my-1 border-gray-200" />
              
              <div
                className="flex items-center px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDuplicateItem(index)}
              >
                <FiExternalLink className="mr-2" />
                Open in new tab
              </div>
              <div
  className="flex items-center px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
  onClick={() => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        console.log("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  }}
>
  <FiLink className="mr-2" />
  Copy link
</div>

              <hr className="my-1 border-gray-200" />
              <div
  className="flex items-center px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
  onClick={() => {
    const pageContent = document.documentElement.outerHTML; // Get full HTML
    const blob = new Blob([pageContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "page.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }}
>
  <FiFolder className="mr-2" />
  Move to
</div>

            </div>
          </DropdownPortal>
        )}
      </li>
    </div>
  );
})}


  {/* Messages Section */}
  {messages.map((msg, index) => {
  const isExpanded = expandedIndex === index;



  return (
    <li
      key={`msg-${index}`}
      className={`cursor-pointer ${isExpanded ? "text-[#009DE9]" : "text-[#333]"}`}
      onClick={() => setExpandedIndex(index)}
    >
      {isExpanded && (
        <div className="bg-second-bg text-[#101010] font-[16px] px-3 py-2 max-w-[500px] rounded-2xl h-auto overflow-auto whitespace-normal">
          {msg.question}
        </div>
      )}
    </li>
  );
})}

</ul>


      

      {/* Follow-up Input */}
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































{/* backend Ready code */}





// import React, { useState, useRef, useEffect } from "react";
// import {
//   FiSearch,
//   FiTrash2,
//   FiCopy,
//   FiEdit2,
//   FiExternalLink,
//   FiLink,
//   FiFolder,
//   FiLock,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
// import Upload from "../../assets/search-icon.svg";
// import Send from "../../assets/Send.svg";
// import File from "../../assets/file.svg";
// import Pluss from "../../assets/pluss.svg";
// import ThreeDots from "../../assets/threeDots.svg";
// import DropdownPortal from "../../components/common/DropdownPortal";


// function ChatSidebar({
//   historyOpen,
//   searchQuery,
//   setSearchQuery,
//   searchHistory,
//   setSearchHistory, 
//   messages,
//   expandedIndex,
//   setExpandedIndex,
//   setQuestion,
//   question,
//   handleSend, 
// }) {
//   const sidebarVariants = {
//     open: { x: 0, opacity: 1 },
//     closed: { x: -330, opacity: 0 },
//   };

//   const [childDropdownIndex, setChildDropdownIndex] = useState(null);
//   const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [renameIndex, setRenameIndex] = useState(null);
//   const [renameValue, setRenameValue] = useState("");

//   const dotRefs = useRef([]);

//   // NOTE: Fetching initial chat history should ideally happen in the parent component
//   // that manages the `searchHistory` state, using useEffect.
//   // Example in parent:
//   // useEffect(() => {
//   //   // API Call: GET /api/chats
//   //   fetch('/api/chats')
//   //     .then(res => res.json())
//   //     .then(data => setSearchHistory(data)) // Update state with fetched history [{id: ..., name: ...}, ...]
//   //     .catch(error => console.error("Failed to fetch chat history:", error));
//   // }, []); // Runs once on mount

//   useEffect(() => {
//     dotRefs.current = dotRefs.current.slice(0, searchHistory.length);
//   }, [searchHistory]);

//   const handleAccordionToggle = (index) => {
//     setOpenAccordionIndex((prev) => (prev === index ? null : index));
//     setChildDropdownIndex(null);
   
//   };

//   const handleThreeDotsToggle = (index) => {
//     setChildDropdownIndex((prev) => (prev === index ? null : index));
//   };

//   const handleOptionClick = (value) => {
//     setSelectedOption(value);
//   };

//   const handleDeleteItem = async (indexToDelete) => {
//     const chatToDelete = searchHistory[indexToDelete];
//     if (!chatToDelete || !chatToDelete.id) {
//         console.error("Cannot delete item: Invalid chat data at index", indexToDelete);
//         return;
//     }
//     const chatId = chatToDelete.id;

//     try {
//       const response = await fetch(`/api/chats/${chatId}`, {
//         method: 'DELETE',
        
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const updatedHistory = searchHistory.filter((_, idx) => idx !== indexToDelete);
//       setSearchHistory(updatedHistory);
//       setChildDropdownIndex(null);

//     } catch (error) {
//       console.error("Failed to delete chat:", error);
//     }
//   };

//   const handleDuplicateItem = async (indexToDuplicate) => {
//     const chatToDuplicate = searchHistory[indexToDuplicate];
//      if (!chatToDuplicate || !chatToDuplicate.id) {
//         console.error("Cannot duplicate item: Invalid chat data at index", indexToDuplicate);
//         return;
//     }
//     const chatId = chatToDuplicate.id;

//     try {
//        const response = await fetch(`/api/chats/${chatId}/duplicate`, {
//         method: 'POST',
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const newChat = await response.json(); 

     
//       const updatedHistory = [
//         ...searchHistory.slice(0, indexToDuplicate + 1),
//         newChat, 
//         ...searchHistory.slice(indexToDuplicate + 1),
//       ];
//       setSearchHistory(updatedHistory);
//       setChildDropdownIndex(null);

//     } catch (error) {
//         console.error("Failed to duplicate chat:", error);
//     }
//   };

//   const handleRenameItem = (index) => {
//     setRenameIndex(index);
//     setRenameValue(searchHistory[index]?.name || "");
//     setChildDropdownIndex(null);
//   };

//   const handleRenameSubmit = async () => {
//     if (renameIndex === null || !searchHistory[renameIndex]) return;

//     const originalChat = searchHistory[renameIndex];
//     const chatId = originalChat.id;
//     const newName = renameValue.trim();

//     if (!newName || newName === originalChat.name) {
//       setRenameIndex(null);
//       setRenameValue("");
//       return;
//     }

//      try {
//        const response = await fetch(`/api/chats/${chatId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: newName }),
//       });

//        if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//        const updatedHistory = [...searchHistory];
//        updatedHistory[renameIndex] = { ...originalChat, name: newName };
//        setSearchHistory(updatedHistory);
//        setRenameIndex(null);
//        setRenameValue("");

//      } catch (error) {
//         console.error("Failed to rename chat:", error);
//      }
//   };

//    const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && question.trim()) {
//         handleSend();
//     }
//    };


//   return (
//     <motion.div
//       variants={sidebarVariants}
//       initial="closed"
//       animate={historyOpen ? "open" : "closed"}
//       transition={{ duration: 0.4, ease: "easeInOut" }}
//       className="bg-white w-[330px] h-full border-r border-[#DDDFE3] absolute left-0 top-0 z-20 flex flex-col"
//     >
//       {/* Search input */}
//       <div className="p-4">
//         <div className="relative w-full">
//           <input
//             type="search"
//             placeholder="Search Chat..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full border border-[#DDDFE3] p-2 pl-7 rounded-[4px] text-sm text-[#37352F] placeholder-[#A2A29F] focus:outline-none focus:border-[#009DE9]"
//           />
//           <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#A2A29F] text-[18px]" />
//         </div>
//       </div>

//       {/* History List */}
//       <ul className="p-4 space-y-2 overflow-y-auto h-[calc(100%-60px)] flex-grow"> 
//         <div className="text-sm text-[#777] mb-2">Recent chats</div>

//         {expandedIndex === null && searchHistory && searchHistory.map((item, index) => {
//           if (!item || typeof item !== 'object' || !item.id || !item.name) {
//              console.warn("Skipping invalid history item at index:", index, item);
//              return null; 
//           }

//           const isAccordionOpen = openAccordionIndex === index;
//           const isChildDropdownOpen = childDropdownIndex === index;

//           if (!dotRefs.current[index]) {
//             dotRefs.current[index] = React.createRef();
//           }

//           return (
//             <div key={item.id} className="relative"> 
//               <li className="cursor-pointer text-[#555] truncate rounded">
//                 <div
//                   className="flex items-center justify-start space-x-2 w-full px-2 py-1 rounded transition "
//                 >
                  

//                   <div className="flex justify-between items-center w-full text-sm text-[#333]">
//                     <div
//                       className="flex items-center space-x-2 truncate flex-grow"
//                       onClick={() => {
                         
//                            console.log("Load chat:", item.id);
//                       }}
//                     >
//                       <img src={File} alt="file" className="w-4 h-4 flex-shrink-0" />
//                       {renameIndex === index ? (
//                         <input
//                           type="text"
//                           value={renameValue}
//                           onChange={(e) => setRenameValue(e.target.value)}
//                           onBlur={handleRenameSubmit}
//                           onKeyDown={(e) => e.key === "Enter" && handleRenameSubmit()}
//                           onClick={(e) => e.stopPropagation()} 
//                           autoFocus
//                           className="text-sm border border-gray-300 rounded px-1 py-0.5 w-full mr-2"
//                         />
//                       ) : (
//                         <span className="truncate" title={item.name}>{item.name}</span>
//                       )}
//                     </div>

//                     <div className="relative flex items-center space-x-2 ml-2 flex-shrink-0"> 
//                       <img
//                         ref={dotRefs.current[index]}
//                         src={ThreeDots}
//                         alt="dots"
//                         onClick={(e) => {
//                           e.stopPropagation(); 
//                           handleThreeDotsToggle(index);
//                         }}
//                         className="cursor-pointer bg-[#F1F1F0] rounded-[3px] p-[6px] hover:bg-gray-300" // Added hover
//                       />
                   
//                     </div>
//                   </div>
//                 </div>

               

//                 {/* Dropdown Portal */}
//                 {isChildDropdownOpen && dotRefs.current[index] && (
//                   <DropdownPortal targetRef={dotRefs.current[index]}>
//                     <div className="bg-white border border-border rounded-md shadow-[5px_5px_8px_0px_rgba(0,0,0,0.2)] w-56 z-30"> {/* Added z-index */}
//                       <div
//                         className="flex items-center px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => handleDeleteItem(index)}
//                       >
//                         <FiTrash2 className="mr-2" />
//                         Delete
//                       </div>
//                       <div
//                         className="flex items-center px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                         onClick={() => handleDuplicateItem(index)}
//                       >
//                         <FiCopy className="mr-2" />
//                         Duplicate
//                       </div>
//                       <div
//                          className="flex items-center px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                          onClick={() => handleRenameItem(index)} 
//                        >
//                          <FiEdit2 className="mr-2" />
//                          Rename
//                       </div>
//                       <hr className="my-1 border-gray-200" />
//                       <div
//                         className="flex items-center px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                         // onClick={() => handleDuplicateItem(index)} 
//                       >
//                         <FiExternalLink className="mr-2" />
//                         Open in new tab 
//                       </div>
//                       <div
//                           className="flex items-center px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                           onClick={() => {
//                              const chatUrl = `${window.location.origin}/chat/${item.id}`; 
//                              navigator.clipboard.writeText(chatUrl)
//                               .then(() => console.log("Link copied!"))
//                               .catch((err) => console.error("Failed to copy link: ", err));
//                              setChildDropdownIndex(null); // Close dropdown
//                           }}
//                         >
//                           <FiLink className="mr-2" />
//                           Copy link
//                       </div>
//                       <hr className="my-1 border-gray-200" />
//                       <div
//                           className="flex items-center px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                           // onClick={() => { /* Move to folder functionality requires backend */ }}
//                         >
//                           <FiFolder className="mr-2" />
//                           Move to
//                       </div>
//                     </div>
//                   </DropdownPortal>
//                 )}
//               </li>
//             </div>
//           );
//         })}

        

//       </ul>

      
//        {expandedIndex !== null && (
//         <div className="p-4 border-t border-[#DDDFE3] bg-white mt-auto"> 
//           <div className="relative w-full">
//             {messages[expandedIndex] && (
//               <div className="mb-2 p-2 bg-gray-100 rounded text-xs text-gray-600 truncate">
//                 Context: {messages[expandedIndex].question}
//               </div>
//             )}

//             <textarea 
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               onKeyDown={handleKeyDown} 
//               placeholder="Ask a follow-up..."
//               className="w-full pl-3 pr-10 py-2 bg-[#F0F1FA] rounded-md border border-[#DDDFE3] text-[#101010] placeholder-[#A2A29F] focus:outline-none transition resize-none text-sm" // Added text-sm, resize-none
//               rows={3} 
//             />
//             <label className="absolute left-3 bottom-3 text-gray-500 cursor-pointer">
//               <input type="file" className="hidden" />
//               <img src={Upload} alt="Upload" className="w-5 h-5" />
//             </label>
//             {/* Send Button */}
//             <button
//               onClick={handleSend} 
//               disabled={!question.trim()}
//               className="absolute right-3 bottom-3 text-[#009DE9] hover:text-[#007AC2] transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <img src={Send} alt="Send" className="w-7 h-7" />
//             </button>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// }

// export default ChatSidebar;