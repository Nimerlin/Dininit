// const MessageParser = ({ actions }) => {
//     const parse = (message) => {
//       if (message.toLowerCase().includes("issue")) {
//         actions.askForIssueType();
//       } else if (message.match(/alert|data|triggering|updating/)) {
//         actions.askForPriority();
//       } else if (message.match(/1|2|3|4|5/)) {
//         actions.thankUser();
//       }
//     };
  
//     return null; // MessageParser does not render anything
//   };
  
//   export default MessageParser;
  

const MessageParser = ({ actions }) => {
    const parse = (message) => {
      // Check the message content to determine the action to trigger
      if (message.toLowerCase().includes("issue")) {
        const action = actions.find((action) => action.name === "askForIssueType");
        if (action) action.action();
      } else if (message.toLowerCase().includes("thanks")) {
        const action = actions.find((action) => action.name === "thankUser");
        if (action) action.action();
      }
    };
  
    return null; // Does not render anything
  };
  
  export default MessageParser;
  
  