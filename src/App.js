import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import MessageInput from "./components/message-input/MessageInput";
import LoginModal from "./components/modals/login-modal/LoginModal";
import AddChatModal from "./components/modals/add-chat-modal/AddChatModal";
import Chat from "./components/chat/Chat";
import axiosInstance from "./utils/axios";
import { message } from "antd";

function App() {
    const [loginModalVisibility, setLoginModalVisibility] = useState(false);
    const [addChatModalVisibility, setAddChatModalVisibility] = useState(false);
    const [idInstance, setIdInstance] = useState("1101822802");
    const [apiTokenInstance, setApiTokenInstance] = useState("9a7fe7fd2eca4517aa6f3b9af3d08933494ff027e99940c1b8");
    const [currentContactPhone, setCurrentContactPhone] = useState(79991150041);
    const [sendingMessage, setSendingMessage] = useState("");
    const [messages, setMessages] = useState({
        79991150041: [
            { text: "Text 1", me: false },
            { text: "Text 2", me: true },
            { text: "Text 3", me: true },
            { text: "Text 4", me: false },
            { text: "Text 1", me: false },
        ],
    });
    console.log(messages);

    const scrollPageToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    const updateMessages = (message, me, contact = null) => {
        const newMessages = messages;
        newMessages[contact ?? currentContactPhone].push({ text: message, me: me });
        setMessages({ ...newMessages });
    };

    const deleteNotification = (receiptId) => {
        return axiosInstance.delete(
            `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
        );
    };

    const sendMessage = (message) => {
        const body = {
            chatId: `${currentContactPhone}@c.us`,
            message: sendingMessage,
        };
        axiosInstance
            .post(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, body)
            .then(() => {
                updateMessages(message, true);
                setSendingMessage("");
                scrollPageToBottom();
            })
            .catch(() => openMessage("error", "Неудачная отправка сообщения"));
    };

    const awaitMessage = () => {
        axiosInstance
            .get(`https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)
            .then((res) => {
                console.log("data", res);
                if (res.data) {
                    const resBody = res.data.body;
                    if (resBody.typeWebhook === "incomingMessageReceived") {
                        const message = resBody.messageData.textMessageData.textMessage;
                        const contact = resBody.senderData.chatId.split("@")[0];
                        updateMessages(message, false, contact);
                    }
                    deleteNotification(res.data.receiptId);
                }
                // awaitMessage();
                // setSendingMessage("");
                // scrollPageToBottom();
            })
            .catch((error) => console.log("Ошибка при ожидании сообщения: ", error));
    };

    const [messageApi, messageApiContext] = message.useMessage();
    const openMessage = (type, content) => {
        messageApi.open({
            type: type,
            content: content,
        });
    };

    useEffect(() => awaitMessage(), []);

    return (
        <>
            {messageApiContext}

            <div className="App">
                <Header
                    phone={currentContactPhone}
                    openLoginModal={() => setLoginModalVisibility(true)}
                    openAddChatModal={() => setAddChatModalVisibility(true)}
                />
                <Chat messages={messages[`${currentContactPhone}`]} />

                <MessageInput
                    sendMessage={sendMessage}
                    sendingMessage={sendingMessage}
                    setSendingMessage={setSendingMessage}
                />

                {addChatModalVisibility && (
                    <AddChatModal
                        visibility={addChatModalVisibility}
                        currentContactPhone={currentContactPhone}
                        setCurrentContactPhone={setCurrentContactPhone}
                        closeModal={() => setAddChatModalVisibility(false)}
                    />
                )}

                {loginModalVisibility && (
                    <LoginModal
                        visibility={loginModalVisibility}
                        idInstance={idInstance}
                        apiTokenInstance={apiTokenInstance}
                        setIdInstance={setIdInstance}
                        setApiTokenInstance={setApiTokenInstance}
                        closeModal={() => setLoginModalVisibility(false)}
                    />
                )}
            </div>
        </>
    );
}

export default App;
