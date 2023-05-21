import axiosInstance from "../axios";

export const getStatusInstanceQuery = (idInstance, apiTokenInstance) => {
    return axiosInstance.get(`https://api.green-api.com/waInstance${idInstance}/getStatusInstance/${apiTokenInstance}`);
};

export const sendMessageQuery = (idInstance, apiTokenInstance, body) => {
    return axiosInstance.post(
        `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
        body
    );
};

export const receiveNotificationQuery = (idInstance, apiTokenInstance) => {
    return axiosInstance.get(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
    );
};

export const deleteNotificationQuery = (idInstance, apiTokenInstance, receiptId) => {
    return axiosInstance.delete(
        `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`
    );
};
