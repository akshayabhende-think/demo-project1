import axios from "axios";

const BASE_URL = "http://localhost:5011";

export const getReminders = async () => {
    const res = await axios.get(`${BASE_URL}/reminders`);
    return res.data;
};
