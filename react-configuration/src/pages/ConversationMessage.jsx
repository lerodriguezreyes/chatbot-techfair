function ConversationMessage({ message, response }) {
    return (
      <div className="conversation-message">
        <p className="user-message">{message}</p>
        <p className="chatbot-response">{response}</p>
      </div>
    );
  }
  
  export default ConversationMessage;