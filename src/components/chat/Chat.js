import "./style.css";
import Message from "../message/Message";

const Chat = ({ messages }) => {
    return (
        <div className="chat-block">
            {messages?.length ? (
                messages.map((el, index) => {
                    return <Message message={el} key={index + el} />;
                })
            ) : (
                <p style={{ opacity: 0.4 }}>Здесь будет история переписки. Начните общение.</p>
            )}
        </div>
    );
};

export default Chat;
