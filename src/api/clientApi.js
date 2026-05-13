import axios from "axios";

const BASE_URL = "http://localhost:5002/clients";

export const getClients = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};
