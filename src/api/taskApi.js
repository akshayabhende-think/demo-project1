import axios from "axios";

const BASE_URL = "http://localhost:5005/tasks";

export const getTasks = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const createTask = async (payload) => {
    const res = await axios.post(BASE_URL, payload);
    return res.data;
};
