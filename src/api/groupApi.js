import axios from "axios";

const BASE_URL = "http://localhost:5003/groups";

export const getGroups = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const createGroup = async (payload) => {
    const res = await axios.post(BASE_URL, payload);
    return res.data;
};
