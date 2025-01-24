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
      if (message.toLowerCase().includes("issue")) {
        actions.askForIssueType();
      } else if (message.match(/alert|data|triggering|updating/i)) {
        actions.askForPriority();
      } else if (message.match(/1|2|3|4|5/)) {
        actions.thankUser();
      } else if (message.toLowerCase().includes("thanks")) {
        actions.thankUser();
      }
    };
  
    return null; // Does not render anything
  };
  
  export default MessageParser;
  
  