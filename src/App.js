import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import MessageInput from "./components/message-input/MessageInput";
import LoginModal from "./components/modals/login-modal/LoginModal";
import AddChatModal from "./components/modals/add-chat-modal/AddChatModal";

function App() {
    const [loginModalVisibility, setLoginModalVisibility] = useState(false);
    const [addChatModalVisibility, setAddChatModalVisibility] = useState(false);
    const [idInstance, setIdInstance] = useState("");
    const [apiTokenInstance, setApiTokenInstance] = useState("");
    const [currentContactPhone, setCurrentContactPhone] = useState("");
    console.log(idInstance, apiTokenInstance);

    return (
        <div className="App">
            <Header
                phone="89991150041"
                openLoginModal={() => setLoginModalVisibility(true)}
                openAddChatModal={() => setAddChatModalVisibility(true)}
            />
            <MessageInput />

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
