import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

const ChatbotComponent = () => {
  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default ChatbotComponent;
