import { Input } from "antd";
import "./style.css";
import { useState } from "react";

const MessageInput = ({ sendMessage }) => {
    const [inputValue, setInputValue] = useState("");
    const handleSendMessage = (event) => {
        sendMessage(event);
        setInputValue("");
        console.log(document.body.scrollHeight);

        setTimeout(window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 0);
    };

    return (
        <div className="message-input-block">
            <Input
                style={{ border: 0, height: "40px" }}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Введите сообщение"
                onPressEnter={(event) => handleSendMessage(event.target.value)}
            />
        </div>
    );
};

export default MessageInput;
