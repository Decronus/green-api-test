import { Button } from "antd";
import "./style.css";

const Header = ({ phone, openLoginModal, openAddChatModal }) => {
    return (
        <div className="header-block">
            <p>{phone}</p>
            <div className="header-buttons-group">
                <Button onClick={openLoginModal}>Учетные данные</Button>
                <Button onClick={openAddChatModal} type="primary">
                    Создать чат
                </Button>
            </div>
        </div>
    );
};

export default Header;
