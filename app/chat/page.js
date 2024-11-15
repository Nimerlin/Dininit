"use client";
import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../components/chatbot/config";
import MessageParser from "../components/chatbot/MessageParser";
import ActionProvider from "../components/chatbot/ActionProvider";

const ChatPage = () => {
  return (
    <div className="chat-container">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default ChatPage;


