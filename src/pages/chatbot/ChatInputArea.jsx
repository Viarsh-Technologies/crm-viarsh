// this code with dummy data, and logic --->(The code given in the comment below is backend ready)




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
        historyOpen ? "" : "pl-4"
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











{/* backend Ready code */}





// import React, { useState, useEffect, useRef } from "react";
// import Upload from "../../assets/search-icon.svg";
// import Send from "../../assets/Send.svg";

// async function sendQuestionToAPI(questionText) {
//   const API_ENDPOINT = "/api/chat";

//   try {
//     const response = await fetch(API_ENDPOINT, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ question: questionText }),
//     });

//     if (!response.ok) {
//       let errorMsg = `API Error: ${response.status} ${response.statusText}`;
//       try {
//         const errorData = await response.json();
//         errorMsg = errorData.message || errorMsg; // Fixed the commented-out error
//       } catch (e) {
//         console.error("Error parsing error response:", e);
//       }
//       throw new Error(errorMsg);
//     }

//     const data = await response.json();
//     return data;

//   } catch (error) {
//     console.error("Failed to send question:", error);
//     throw error;
//   }
// }

// function ChatInputArea({
//   question,
//   setQuestion,
//   onSendSuccess,
//   historyOpen,
//   searchHistory,
//   setSearchHistory,
// }) {
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const inputRef = useRef(null);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuestion(value);
//     setError(null);

//     if (value.trim() && searchHistory.length > 0) {
//       setShowSuggestions(true);
//     } else {
//       setShowSuggestions(false);
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setQuestion(suggestion);
//     setShowSuggestions(false);
//     inputRef.current?.focus();
//   };

//   const filteredSuggestions = searchHistory.filter(
//     (item) =>
//       item.toLowerCase().includes(question.toLowerCase()) && item !== question
//   );

//   const handleSubmit = async (questionToSend = question) => {
//     const trimmedQuestion = questionToSend.trim();
//     if (!trimmedQuestion || isLoading) {
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setShowSuggestions(false);

//     setSearchHistory((prev) =>
//       [trimmedQuestion, ...prev.filter((q) => q !== trimmedQuestion)].slice(0, 5)
//     );

//     try {
//       const responseData = await sendQuestionToAPI(trimmedQuestion);

//       setQuestion("");

//       if (onSendSuccess) {
//         onSendSuccess(trimmedQuestion, responseData);
//       }

//     } catch (err) {
//       setError(err.message || "Failed to send message. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Escape') {
//       setShowSuggestions(false);
//       return;
//     }
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const handleFocus = () => {
//     if (searchHistory.length > 0 && question.trim()) {
//       setShowSuggestions(true);
//     }
//     setError(null);
//   };

//   const handleBlur = () => {
//     setTimeout(() => {
//       setShowSuggestions(false);
//     }, 150);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       console.log("Selected file:", file.name);
//       alert(`File "${file.name}" selected. Upload functionality not yet implemented.`);
//       e.target.value = null;
//     }
//   };

//   return (
//     <div
//       className={`p-4 bg-white border-t border-[#DDDFE3] transition-all duration-500 ease-in-out ${
//         historyOpen ? "" : "pl-4"
//       }`}
//     >
//       <div className="relative w-full max-w-[700px] mx-auto">
//         {showSuggestions && filteredSuggestions.length > 0 && (
//           <ul className="absolute bottom-full left-0 mb-1 bg-white border border-[#DDDFE3] rounded-md w-full z-20 max-h-40 overflow-y-auto shadow-lg">
//             {filteredSuggestions.map((item, index) => (
//               <li
//                 key={index}
//                 onMouseDown={() => handleSuggestionClick(item)}
//                 className="px-3 py-2 hover:bg-[#F0F1FA] cursor-pointer text-[#555] text-sm"
//               >
//                 {item}
//               </li>
//             ))}
//           </ul>
//         )}

//         <div className="relative">
//           <input
//             ref={inputRef}
//             type="text"
//             value={question}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             onFocus={handleFocus}
//             onBlur={handleBlur}
//             placeholder={isLoading ? "Sending..." : "Type your question..."}
//             disabled={isLoading}
//             className={`w-full pl-10 pr-12 bg-[#F0F1FA] py-3 rounded-md border ${
//               error ? 'border-red-500' : 'border-[#DDDFE3]'
//             } h-[60px] text-[#101010] placeholder-[#A2A29F] focus:outline-none focus:border-[#009DE9] transition resize-none text-sm leading-tight pt-3 pr-10`}
//             style={{ paddingBottom: '1rem' }}
//             aria-invalid={!!error}
//             aria-describedby={error ? "chat-error-message" : undefined}
//           />

//           <label className={`absolute left-3 bottom-3 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : 'text-gray-500 hover:text-[#009DE9]'}`}>
//             <input
//               type="file"
//               className="hidden"
//               onChange={handleFileChange}
//               disabled={isLoading}
//             />
//             <img src={Upload} alt="Upload File" className="w-5 h-5" />
//           </label>

//           <button
//             onClick={() => handleSubmit()}
//             disabled={!question.trim() || isLoading}
//             className="absolute right-3 bottom-3 text-[#009DE9] hover:text-[#007AC2] transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//             aria-label="Send message"
//           >
//             <img src={Send} alt="Send" className="w-6 h-6" />
//           </button>
//         </div>

//         {error && (
//           <p id="chat-error-message" className="text-red-600 text-xs mt-1 pl-1" role="alert">
//             {error}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ChatInputArea;
