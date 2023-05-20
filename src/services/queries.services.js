import axiosInstance from "../utils/axios";

class Queries {
    getStatusInstance(idInstance, apiTokenInstance) {
        return axiosInstance.get(
            `https://api.green-api.com/waInstance${idInstance}/getStatusInstance/${apiTokenInstance}`
        );
    }

    sendMessage(idInstance, apiTokenInstance, body) {
        return axiosInstance.post(
            `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
            body
        );
    }

    receiveNotification(idInstance, apiTokenInstance) {
        return axiosInstance.get(
            `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
        );
    }

    deleteNotification(idInstance, apiTokenInstance, receiptId) {
        return axiosInstance.delete(
            `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
        );
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Queries();
