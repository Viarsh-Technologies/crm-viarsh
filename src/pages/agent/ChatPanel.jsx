import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { FaPaperPlane, FaMicrophone, FaPaperclip, FaRedo } from 'react-icons/fa';

const presetAnswer = {
    id: Date.now() + 1, // unique id logic needed
    sender: 'agent',
    text: "Apologies, I’m currently not in a position to respond. I’m not connected to the backend at the moment",
};

const presetSuggestions = [
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor.",
    "Lorem ipsum dolor sit",
];

// Accept addHistoryEntry as a prop
function ChatPanel({ addHistoryEntry }) {
    const [messages, setMessages] = useState([
    ]);
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (inputValue.trim() === '') return;

        const userMessage = {
            id: Date.now(),
            sender: 'user',
            text: inputValue,
        };

        const agentResponse = {
             id: Date.now() + 1, 
             sender: 'agent',
             text: presetAnswer.text,
        };


        // Update chat messages state
        setMessages(prev => [...prev, userMessage, agentResponse]);

        addHistoryEntry({
          userQuestion: userMessage.text,
          agentResponse: agentResponse.text,
        });


        setShowSuggestions(true);
        setInputValue('');

    };

     const handleSuggestionClick = (suggestion) => {
        const userMessage = {
            id: Date.now(),
            sender: 'user',
            text: suggestion,
        };
         const suggestionResponse = {
            id: Date.now() + 1,
            sender: 'agent',
            text: `"${suggestion}" searching about it`,
        };
        setMessages(prev => [...prev, userMessage, suggestionResponse]);

        addHistoryEntry({
            userQuestion: userMessage.text,
            agentResponse: suggestionResponse.text,
        });

        setShowSuggestions(false);
        setInputValue('');
    };


    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setShowSuggestions(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleFileUpload = () => alert('File upload feature coming soon!');
    const handleVoiceInput = () => alert('Voice input feature coming soon!');
    const handleReload = () => {
      setMessages([]);
      setShowSuggestions(false);
      setInputValue('');
      alert('Conversation Reloaded (Chat view only)');
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-[#BDBDBD]">
                <h2 className="text-lg font-semibold text-gray-700">Conversation Preview</h2>
                <FaRedo
                    className="text-gray-500 hover:text-blue-600 cursor-pointer"
                    title="Reload Conversation"
                    onClick={handleReload}
                 />
            </div>

            {/* Chat Messages Area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-[#F0F1FA]">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Suggestions Area */}
            {showSuggestions && (
                <div className="px-4 pt-2 pb-1 border-t border-gray-200 bg-white">
                     <p className="text-xs text-gray-500 mb-2">Sugg:</p>
                    <div className="flex flex-wrap gap-2">
                        {presetSuggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition duration-150"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 ">
                <div className="flex items-center bg-white border border-gray-300 rounded-lg p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
                    <button onClick={handleFileUpload} className="p-2 text-gray-500 hover:text-blue-600" title="Attach File">
                        <FaPaperclip />
                    </button>
                    <button onClick={handleVoiceInput} className="p-2 text-gray-500 hover:text-blue-600" title="Voice Input">
                        <FaMicrophone />
                    </button>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me a question..."
                        className="flex-grow px-3 py-2 border-none focus:outline-none focus:ring-0 text-sm"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="p-2 text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                        disabled={!inputValue.trim()}
                        title="Send Message"
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChatPanel;