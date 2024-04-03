
function ConversationMessage({userPrompt}) {
    // console.log(userPrompt.replace(/["{}]/g, "").slice(7) + " ")
  return (
    <div className="conversation-msg">
      <p>{userPrompt.replace(/["{}]/g, "").slice(0,7)+ ": "+ userPrompt.replace(/["{}]/g, "").slice(8) }</p>
    </div>
  );
}
export default ConversationMessage;
