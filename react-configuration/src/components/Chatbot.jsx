import { useState } from "react";
import { post } from "../services/authService";
import ConversationMessageTogether from "./ConversationMessageTogether";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await post('/chat', { message });
      const newResponse = response.data.message;
      setConversation((prevConversation) => [
        ...prevConversation,
        { message, response: newResponse },
      ]);
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Chatbot">
      <h2>Chatbot</h2>
      <div className="conversation">
        {conversation.map((item, index) => (
          <ConversationMessageTogether
            key={index}
            message={item.message}
            response={item.response}
          />
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;



// import { useState } from "react";
// import { post } from "../services/authService";
// import ResponseMessageCard from "../components/ResponseMessageCard";
// import ConversationMessage from "./ConversationMessage";

// function Chatbot() {
//   const [message, setMessage] = useState("");
//   const [responses, setResponses] = useState([]);
//   const [conversation, setConversation] = useState([]);
//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await post("/chat", { message });
//       const newResponse = response.data.message;
//       setResponses((prevResponse) => [...prevResponse, newResponse]);
//       setMessage("");
//       setConversation((prevConv) => [...prevConv, response.config.data]);
//       console.log(conversation);
//       console.log("This is the prompt ==>", response.config.data);
//       console.log("This is the messege ==>", response.data.message);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="Chatbot">
//       <h2>Chatbot</h2>
//       <div className="userMessage">
//         {conversation.map((userPrompt, index) => (
//           <ConversationMessage key={index} userPrompt={userPrompt} />
//         ))}
//       </div>
//       <div className="response">
//         {responses.map((response, index) => (
//           <ResponseMessageCard key={index} response={response} />
//         ))}
//       </div>
//       <form onSubmit={handleSendMessage}>
//         <input
//           type="text"
//           value={message}
//           onChange={handleMessageChange}
//           placeholder="Type your message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }

// export default Chatbot;
