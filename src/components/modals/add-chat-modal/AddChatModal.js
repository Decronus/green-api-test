import "../style.css";
import InputMask from "react-input-mask";
import { useRef, useState } from "react";
import { Button, Modal } from "antd";

const AddChatModal = ({ visibility, saveContactPhone, setVisibleContactPhone, closeModal }) => {
    const phoneRef = useRef(null);
    const [phoneLength, setPhoneLength] = useState(2);

    const deleteNotNumbers = (value) => {
        return value.replace(/\D/g, "");
    };

    const calcPhoneLength = (event) => {
        const { value } = event.target;
        const valLength = deleteNotNumbers(value).length;
        setPhoneLength(valLength);
    };

    const handleSaveContactPhone = () => {
        const phone = phoneRef.current.value;
        const phoneWithoutNum = deleteNotNumbers(phone);
        setVisibleContactPhone(phone);
        saveContactPhone(phoneWithoutNum);
    };

    return (
        <Modal title="Создать чат" open={visibility} width={400} onCancel={closeModal} footer={null}>
            <div className="modal-content">
                <InputMask
                    mask="+7 (\999) 999-99-99"
                    className="modal-input"
                    type="text"
                    placeholder="Номер телефона контакта"
                    ref={phoneRef}
                    onChange={(event) => calcPhoneLength(event)}
                />
                <div className="modal-button-wrap">
                    <Button onClick={closeModal}>Отмена</Button>
                    <Button type="primary" onClick={handleSaveContactPhone} disabled={phoneLength < 11}>
                        Создать
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default AddChatModal;
