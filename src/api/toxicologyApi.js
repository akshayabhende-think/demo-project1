import axios from "axios";

const BASE_URL = "http://localhost:5006";

export const getToxicologyTests = async () => {
    const res = await axios.get(`${BASE_URL}/tests`);
    return res.data;
};

export const getToxicologyExceptions = async () => {
    const res = await axios.get(`${BASE_URL}/exceptions`);
    return res.data;
};

export const getToxicologyShipments = async () => {
    const res = await axios.get(`${BASE_URL}/shipments`);
    return res.data;
};

export const getToxicologyPendingResults = async () => {
    const res = await axios.get(`${BASE_URL}/pendingResults`);
    return res.data;
};

export const getToxicologyRejected = async () => {
    const res = await axios.get(`${BASE_URL}/rejected`);
    return res.data;
};

export const getToxicologyResults = async () => {
    const res = await axios.get(`${BASE_URL}/results`);
    return res.data;
};
