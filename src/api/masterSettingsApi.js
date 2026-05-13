import axios from "axios";

const BASE_URL = "http://localhost:5012";

export const getDataImports = async () => {
    const res = await axios.get(`${BASE_URL}/dataImports`);
    return res.data;
};

export const getCptCodes = async () => {
    const res = await axios.get(`${BASE_URL}/cptCodes`);
    return res.data;
};

export const getZCodes = async () => {
    const res = await axios.get(`${BASE_URL}/zCodes`);
    return res.data;
};

export const getDsmCodes = async () => {
    const res = await axios.get(`${BASE_URL}/dsmCodes`);
    return res.data;
};

export const getProblemList = async () => {
    const res = await axios.get(`${BASE_URL}/problemList`);
    return res.data;
};

export const createProblem = async (payload) => {
    const res = await axios.post(`${BASE_URL}/problemList`, payload);
    return res.data;
};
