import axios from "axios";

const BASE_URL = "http://localhost:5008";

export const getAvailability = async () => {
    const res = await axios.get(`${BASE_URL}/availability`);
    return res.data;
};

export const getHolidays = async () => {
    const res = await axios.get(`${BASE_URL}/holidays`);
    return res.data;
};

export const getAppointmentTypes = async () => {
    const res = await axios.get(`${BASE_URL}/appointmentTypes`);
    return res.data;
};
