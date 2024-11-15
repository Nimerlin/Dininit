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
  botName: "IssueBot",
  initialMessages: [
    createChatBotMessage("Hello! How can I assist you today?"),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#00bfae",
    },
    chatButton: {
      backgroundColor: "#00bfae",
    },
  },
};

export default config;
