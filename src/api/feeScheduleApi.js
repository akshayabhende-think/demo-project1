import axios from "axios";

const BASE_URL = "http://localhost:5014";

export const getFeeSchedule = async () => {
    const res = await axios.get(`${BASE_URL}/feeSchedule`);
    return res.data;
};

export const deleteFeeSchedule = async (id) => {
    const res = await axios.delete(`${BASE_URL}/feeSchedule/${id}`);
    return res.data;
};

export const createFeeSchedule = async (payload) => {
    const res = await axios.post(`${BASE_URL}/feeSchedule`, payload);
    return res.data;
};
