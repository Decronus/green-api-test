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
    const [idInstance, setIdInstance] = useState("");
    const [apiTokenInstance, setApiTokenInstance] = useState("");
    const [currentContactPhone, setCurrentContactPhone] = useState(null);
    const [visibleContactPhone, setVisibleContactPhone] = useState("");
    const [sendingMessage, setSendingMessage] = useState("");
    const [messages, setMessages] = useState({
        79999999999: [
            { text: "Example text 1", me: true },
            { text: "Example text 2", me: false },
        ],
    });

    const sendMessageAxios = (body) => {
        return axiosInstance.post(
            `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
            body
        );
    };

    const receiveNotificationAxios = () => {
        return axiosInstance.get(
            `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
        );
    };

    const deleteNotificationAxios = (receiptId) => {
        return axiosInstance.delete(
            `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
        );
    };

    const scrollPageToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    const updateMessages = (message, me, contact = null) => {
        const newMessages = messages;
        newMessages[contact ?? currentContactPhone] = [];
        newMessages[contact ?? currentContactPhone].push({ text: message, me: me });
        setMessages({ ...newMessages });
    };

    const sendMessage = (message) => {
        if (message) {
            const body = {
                chatId: `${currentContactPhone}@c.us`,
                message: sendingMessage,
            };
            sendMessageAxios(body)
                .then(() => {
                    updateMessages(message, true);
                    setSendingMessage("");
                    scrollPageToBottom();
                })
                .catch(() => openMessage("error", "Неудачная отправка сообщения"));
        }
    };

    const awaitMessage = () => {
        receiveNotificationAxios()
            .then((res) => {
                if (res.data) {
                    const resBody = res.data.body;
                    const receiptId = res.data.receiptId;

                    if (resBody.typeWebhook === "incomingMessageReceived") {
                        const message = resBody.messageData.textMessageData.textMessage;
                        const contact = resBody.senderData.chatId.split("@")[0];
                        updateMessages(message, false, contact);
                    }

                    deleteNotificationAxios(receiptId)
                        .then(() => awaitMessage())
                        .catch(() => deleteNotificationAxios(receiptId));
                } else {
                    awaitMessage();
                }
            })
            .catch(() => awaitMessage());
    };

    const saveContactPhone = (value) => {
        setCurrentContactPhone(value);
        setAddChatModalVisibility(false);
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
                    phone={visibleContactPhone}
                    openLoginModal={() => setLoginModalVisibility(true)}
                    openAddChatModal={() => setAddChatModalVisibility(true)}
                />
                <Chat messages={messages[`${currentContactPhone}`]} currentContactPhone={currentContactPhone} />

                <MessageInput
                    currentContactPhone={currentContactPhone}
                    sendMessage={sendMessage}
                    sendingMessage={sendingMessage}
                    setSendingMessage={setSendingMessage}
                />

                {addChatModalVisibility && (
                    <AddChatModal
                        visibility={addChatModalVisibility}
                        currentContactPhone={currentContactPhone}
                        setVisibleContactPhone={setVisibleContactPhone}
                        setCurrentContactPhone={setCurrentContactPhone}
                        saveContactPhone={saveContactPhone}
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
