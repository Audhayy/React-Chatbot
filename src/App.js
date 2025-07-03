import { useState } from 'react';
import './App.css';
import { getChatGPTResponse } from './api';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, isUser: true }]);
    const userInput = input;
    setInput('');
    setIsLoading(true);
    const botResponse = await getChatGPTResponse(userInput);
    setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
    setIsLoading(false);
  };

  return (
    <div className="chatbot-container">
      <h1>Chatbot for stock market</h1>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>Send</button>
      </form>
    </div>
  );
}

export default App;