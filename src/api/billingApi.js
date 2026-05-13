import axios from "axios";

const BASE_URL = "http://localhost:5007";

export const getBillingEncounters = async () => {
    const res = await axios.get(`${BASE_URL}/encounters`);
    return res.data;
};

export const getBillingSuperbills = async () => {
    const res = await axios.get(`${BASE_URL}/superbills`);
    return res.data;
};

export const getBillingInvoices = async () => {
    const res = await axios.get(`${BASE_URL}/invoices`);
    return res.data;
};

export const getBillingReceipts = async () => {
    const res = await axios.get(`${BASE_URL}/receipts`);
    return res.data;
};
