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
  
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  askForIssueType = () => {
    const message = this.createChatBotMessage(
      "What type of issue are you experiencing? (Alert/Data/Triggering/Updating)"
    );
    this.addMessageToState(message);
  };

  askForPriority = () => {
    const message = this.createChatBotMessage(
      "On a scale of 1-5, how urgent is this issue? (1 being lowest, 5 being highest)"
    );
    this.addMessageToState(message);
  };

  thankUser = () => {
    const message = this.createChatBotMessage(
      "Thank you for providing that information. I'll help you resolve this issue."
    );
    this.addMessageToState(message);
  };
}

export default ActionProvider;
  
  