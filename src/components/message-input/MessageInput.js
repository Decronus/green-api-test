import { Input } from "antd";
import "./style.css";

const MessageInput = ({ sendMessage, sendingMessage, setSendingMessage }) => {
    return (
        <div className="message-input-block">
            <Input
                style={{ border: 0, height: "40px" }}
                value={sendingMessage}
                onChange={(event) => setSendingMessage(event.target.value)}
                placeholder="Введите сообщение"
                onPressEnter={(event) => sendMessage(event.target.value)}
            />
        </div>
    );
};

export default MessageInput;
