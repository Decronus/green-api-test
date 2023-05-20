import "./style.css";
import Message from "../message/Message";

const Chat = ({ messages, currentContactPhone }) => {
    return (
        <div className="chat-block">
            {currentContactPhone ? (
                messages?.length ? (
                    messages.map((el, index) => {
                        return <Message message={el} key={index + el} />;
                    })
                ) : (
                    <p style={{ opacity: 0.4 }}>Здесь будет история переписки. Начните общение.</p>
                )
            ) : (
                <p style={{ opacity: 0.4 }}>Создайте чат для начала переписки.</p>
            )}
        </div>
    );
};

export default Chat;
