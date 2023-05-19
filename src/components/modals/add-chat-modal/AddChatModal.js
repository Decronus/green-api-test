import "../style.css";
import { Button, Modal } from "antd";

const AddChatModal = ({ visibility, currentContactPhone, setCurrentContactPhone, closeModal }) => {
    return (
        <Modal title="Создать чат" open={visibility} width={400} onCancel={closeModal} footer={null}>
            <div className="modal-content">
                <input
                    className="modal-input"
                    type="text"
                    placeholder="Номер телефона контакта"
                    value={currentContactPhone}
                    onChange={(event) => setCurrentContactPhone(event.target.value)}
                />
                <div className="modal-button-wrap">
                    <Button onClick={closeModal}>Отмена</Button>
                    <Button type="primary" onClick={closeModal}>
                        Создать
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default AddChatModal;
