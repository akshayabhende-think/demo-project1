import axios from "axios";

const BASE_URL = "http://localhost:5015";

export const getBequipCount = async () => {
    const res = await axios.get(`${BASE_URL}/bequipCount`);
    return res.data;
};

export const getAsamCount = async () => {
    const res = await axios.get(`${BASE_URL}/asamCount`);
    return res.data;
};

export const getCensusDemographics = async () => {
    const res = await axios.get(`${BASE_URL}/censusDemographics`);
    return res.data;
};

export const getCensusServiceCounts = async () => {
    const res = await axios.get(`${BASE_URL}/censusServiceCounts`);
    return res.data;
};

export const getCensusStats = async () => {
    const res = await axios.get(`${BASE_URL}/censusStats`);
    return res.data;
};

export const getCensusLevelOfCare = async () => {
    const res = await axios.get(`${BASE_URL}/censusLevelOfCare`);
    return res.data;
};

export const getOverdueAsam = async () => {
    const res = await axios.get(`${BASE_URL}/overdueAsam`);
    return res.data;
};

export const getInactiveClients = async () => {
    const res = await axios.get(`${BASE_URL}/inactiveClients`);
    return res.data;
};

export const getStaffSessions = async () => {
    const res = await axios.get(`${BASE_URL}/staffSessions`);
    return res.data;
};

export const getBillingReport = async () => {
    const res = await axios.get(`${BASE_URL}/billingReport`);
    return res.data;
};

export const getNoShow = async () => {
    const res = await axios.get(`${BASE_URL}/noShow`);
    return res.data;
};

export const getAppointmentCancellation = async () => {
    const res = await axios.get(`${BASE_URL}/appointmentCancellation`);
    return res.data;
};

export const getBillingProgramReport = async () => {
    const res = await axios.get(`${BASE_URL}/billingProgramReport`);
    return res.data;
};
