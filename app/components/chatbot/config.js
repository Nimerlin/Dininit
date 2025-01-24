// import { createChatBotMessage } from "react-chatbot-kit";

// const config = {
//   botName: "IssueBot",
//   initialMessages: [createChatBotMessage("Hello! How can I assist you today?")],
//   customStyles: {
//     botMessageBox: {
//       backgroundColor: "#00bfae",
//     },
//     chatButton: {
//       backgroundColor: "#00bfae",
//     },
//   },
// };

// export default config;


import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [
    createChatBotMessage("Hello! How can I help you today?"),
  ],
  botName: "Support Bot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
};

export default config;
