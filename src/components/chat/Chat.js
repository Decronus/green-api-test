import "./style.css";
import Message from "../message/Message";

const Chat = ({ messages }) => {
    return (
        <div className="chat-block">
            {messages?.map((el, index) => {
                return <Message message={el} key={index + el} />;
            })}
        </div>
    );
};

export default Chat;
