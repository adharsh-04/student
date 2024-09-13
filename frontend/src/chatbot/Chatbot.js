import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [showBot, setShowBot] = useState(false);

  const toggleBot = () => {
    setShowBot(!showBot);
  };

  return (
    <div>
      <button 
        style={{
          position: 'fixed',
          bottom: '10px',
          right: showBot ? '370px' : '20px', // Move to the side when the bot is open
          zIndex: '1000',
          backgroundColor: '#ff0000', // Button color
          color: 'white',
          border: 'none',
          padding: '16px',
          borderRadius: '70px',
          width: '90px',
          fontSize: '18px',
          cursor: 'pointer',
          boxShadow: '0px 5px 10px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }} 
        onClick={toggleBot}
      >
        {showBot ? 'X' : 'ChatBot'}
      </button>

      {showBot && (
        <>
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100vw',
              height: '100vh',
              backdropFilter: 'blur(4px)', // Blurs the background when bot is open
              zIndex: '998',
            }}
          />
          <iframe
            title="chatbot"
            src="https://cdn.botpress.cloud/webchat/v2/shareable.html?botId=38ee8edd-6dc7-4429-bc65-90210505430c"
            style={{
              position: 'fixed',
              bottom: '0px',
              right: '0px',
              height: '100vh',
              width: '350px',
              border: 'none',
              zIndex: '999',
              boxShadow: '0px 0px 15px rgba(0,0,0,0.2)',
              borderRadius: '10px 10px 0 0',
              transition: 'all 0.3s ease',
              backgroundColor: '#000000', // Changed the iframe background to black
            }}
          />
        </>
      )}
    </div>
  );
};

export default Chatbot;
