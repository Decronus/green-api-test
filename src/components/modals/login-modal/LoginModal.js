import "../style.css";
import { Button, Modal } from "antd";

const LoginModal = ({ visibility, idInstance, setIdInstance, apiTokenInstance, setApiTokenInstance, closeModal }) => {
    return (
        <Modal title="Учетные данные" open={visibility} width={400} closable={false} footer={null}>
            <div className="modal-content">
                <input
                    className="modal-input"
                    type="text"
                    placeholder="Введите idInstance"
                    value={idInstance}
                    onChange={(event) => setIdInstance(event.target.value)}
                />
                <input
                    className="modal-input"
                    type="password"
                    placeholder="Введите apiTokenInstance"
                    value={apiTokenInstance}
                    onChange={(event) => setApiTokenInstance(event.target.value)}
                />
                <div className="modal-button-wrap">
                    <Button type="primary" disabled={!(idInstance && apiTokenInstance)} onClick={closeModal}>
                        Сохранить
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;
