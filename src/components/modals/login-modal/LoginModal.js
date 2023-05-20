import "../style.css";
import { Button, Modal } from "antd";
import Queries from "../../../services/queries.services";

const LoginModal = ({
    visibility,
    idInstance,
    setIdInstance,
    apiTokenInstance,
    setApiTokenInstance,
    closeModal,
    setAddChatModalVisibility,
    initInstance,
    setInitInstance,
    awaitMessage,
    openMessage,
}) => {
    const handleCloseModal = () => {
        Queries.getStatusInstance(idInstance, apiTokenInstance)
            .then((res) => {
                if (res.data.statusInstance === "online") {
                    if (initInstance) {
                        setInitInstance(false);
                        setAddChatModalVisibility(true);
                        awaitMessage();
                    }
                    closeModal();
                } else {
                    openMessage(
                        "error",
                        "Ваш аккаунт не может принимать/отправлять сообщения или сокет закрыт. Проверьте настройки."
                    );
                }
            })
            .catch(() => {
                openMessage("error", "Ошибка при инициализации инстанса. Проверьте учётные данные и попробуйте снова.");
            });
    };

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
                    <Button type="primary" disabled={!(idInstance && apiTokenInstance)} onClick={handleCloseModal}>
                        Сохранить
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;
