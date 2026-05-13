import axios from "axios";

const BASE_URL = "http://localhost:5001/prospects";

export const getProspects = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const createProspect = async (payload) => {
    const res = await axios.post(BASE_URL, payload);
    return res.data;
};

export const deleteProspect = async (id) => {
    return axios.delete(`${BASE_URL}/${encodeURIComponent(id)}`);
};

export const updateProspect = async (id, payload) => {
    const res = await axios.patch(
        `${BASE_URL}/${encodeURIComponent(id)}`,
        payload
    );
    return res.data;
};
