// const ActionProvider = ({ createChatBotMessage, setState }) => {
//     const askForIssueType = () => {
//       const message = createChatBotMessage("What type of issue is it? (e.g., alert not triggering, data not updating)");
//       setState((prev) => ({
//         ...prev,
//         messages: [...prev.messages, message],
//       }));
//     };
  
//     // const askForPriority = () => {
//     //   const message = createChatBotMessage("Please rate the priority of the issue (1 - Low, 5 - High).");
//     //   setState((prev) => ({
//     //     ...prev,
//     //     messages: [...prev.messages, message],
//     //   }));
//     // };
  
//     // const thankUser = () => {
//     //   const message = createChatBotMessage("Thank you! Your issue has been recorded and will be reviewed.");
//     //   setState((prev) => ({
//     //     ...prev,
//     //     messages: [...prev.messages, message],
//     //   }));
//     // };
  
//     return {
//       askForIssueType,
//     //   askForPriority,
//     //   thankUser,
//     }; // Ensure no JSX is returned here
//   };
  
//   export default ActionProvider;
  
const ActionProvider = ({ createChatBotMessage, setState }) => {
    // Function to ask for issue type
    const askForIssueType = () => {
      const message = createChatBotMessage(
        "What type of issue is it? (e.g., alert not triggering, data not updating)"
      );
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    };
  
    // Function to thank the user
    const thankUser = () => {
      const message = createChatBotMessage("Thank you for sharing the details!");
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    };
  
    return [
      { name: "askForIssueType", action: askForIssueType },
      { name: "thankUser", action: thankUser },
    ];
  };
  
  export default ActionProvider;
  
  