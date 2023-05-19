import "./style.css";

const Message = ({ message }) => {
    const recievedMessageStyle = { alignSelf: "flex-start" };
    const sentMessageStyle = { background: "#E0FCD7", alignSelf: "flex-end" };

    return (
        <div className="message-wrap" style={message.me ? sentMessageStyle : recievedMessageStyle}>
            <p>{message.text}</p>
        </div>
    );
};

export default Message;
