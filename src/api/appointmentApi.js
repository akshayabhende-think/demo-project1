import axios from "axios";

const BASE_URL = "http://localhost:5004/appointments";

export const getAppointments = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const createAppointment = async (payload) => {
    const res = await axios.post(BASE_URL, payload);
    return res.data;
};
