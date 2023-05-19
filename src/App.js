import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import MessageInput from "./components/message-input/MessageInput";
import LoginModal from "./components/modals/login-modal/LoginModal";
import AddChatModal from "./components/modals/add-chat-modal/AddChatModal";
import Chat from "./components/chat/Chat";

function App() {
    const [loginModalVisibility, setLoginModalVisibility] = useState(false);
    const [addChatModalVisibility, setAddChatModalVisibility] = useState(false);
    const [idInstance, setIdInstance] = useState("1101822802");
    const [apiTokenInstance, setApiTokenInstance] = useState("9a7fe7fd2eca4517aa6f3b9af3d08933494ff027e99940c1b8");
    const [currentContactPhone, setCurrentContactPhone] = useState(79991150041);
    const [messages, setMessages] = useState({
        79991150041: [
            { text: "Text 1", me: false },
            { text: "Text 2", me: true },
            { text: "Text 3", me: true },
            { text: "Text 4", me: false },
            { text: "Text 1", me: false },
            { text: "Text 2", me: true },
            { text: "Text 3", me: true },
            { text: "Text 4", me: false },
            { text: "Text 1", me: false },
            { text: "Text 2", me: true },
            { text: "Text 3", me: true },
            { text: "Text 4", me: false },
            { text: "Text 1", me: false },
            { text: "Text 2", me: true },
            { text: "Text 3", me: true },
            { text: "Text 4", me: false },
        ],
    });

    const sendMessage = (message) => {
        fetch(`https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`, {
            method: "POST",
            body: JSON.stringify({
                chatId: `${currentContactPhone}@c.us`,
                message: "I use Green-API to send this message to you!",
            }),
        });

        const newMessages = messages;
        newMessages[currentContactPhone].push({ text: message, me: true });
        setMessages({ ...newMessages });
    };

    return (
        <div className="App">
            <Header
                phone={currentContactPhone}
                openLoginModal={() => setLoginModalVisibility(true)}
                openAddChatModal={() => setAddChatModalVisibility(true)}
            />
            <Chat messages={messages["89991150041"]} />

            <MessageInput sendMessage={sendMessage} />

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
    );
}

export default App;
