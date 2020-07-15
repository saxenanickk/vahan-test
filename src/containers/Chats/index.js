import React, { useState, useEffect } from "react";
import { SEND } from "../../assets/img";
import "./styles.css";

const chatRef = React.createRef();
const textInput = React.createRef();

function Chats() {
  const [chats, setChats] = useState([]);
  const [userMessage, setMessage] = useState("");

  const scrollToBottom = () => {
    chatRef.current.scrollTop =
      chatRef.current.scrollHeight - chatRef.current.clientHeight;
  };

  const onMessage = () => {
    return Promise.resolve({
      data: {
        botMessage: "Pardon my ignorance. I am just a dummy.",
      },
    });
  };

  const appendChats = async (userMsg) => {
    try {
      const botReply = await onMessage();
      const {
        data: { botMessage },
      } = botReply;

      const botMsg = {
        type: "bot",
        data: botMessage,
      };

      const chatsTillNow = chats.slice();

      chatsTillNow.push(userMsg);
      chatsTillNow.push(botMsg);

      setMessage("");
      setChats(chatsTillNow);
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  const sendUserMessage = async () => {
    try {
      if (!userMessage.length) return;
      const userMsg = {
        type: "user",
        data: userMessage,
      };

      appendChats(userMsg);
      textInput.current.value = "";
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => scrollToBottom());

  return (
    <div className="chat-container">
      <div className="chats" ref={chatRef}>
        {chats.map((item, index) => (
          <span key={`${item.data}${index}`} className={item.type}>
            <p>{item.data}</p>
          </span>
        ))}
        <div ref={chatRef}></div>
      </div>
      <div className="chat-box">
        <input
          ref={textInput}
          className="text-input"
          name="input"
          placeholder="Type a message"
          autoComplete="off"
          autoFocus
          onChange={({ target: { value } }) => setMessage(value)}
        ></input>
        <button className="send" onClick={sendUserMessage}>
          <img
            alt="send"
            src={SEND}
            style={{ width: "20px", height: "20px" }}
          />
        </button>
      </div>
    </div>
  );
}

export default Chats;
