import axios from "axios";

const BASE_URL = "http://localhost:5010";

export const getLocations = async () => {
    const res = await axios.get(`${BASE_URL}/locations`);
    return res.data;
};

export const getPracticeUsers = async () => {
    const res = await axios.get(`${BASE_URL}/users`);
    return res.data;
};

export const getRoles = async () => {
    const res = await axios.get(`${BASE_URL}/roles`);
    return res.data;
};
