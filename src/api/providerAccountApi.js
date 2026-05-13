import axios from "axios";

const BASE_URL = "http://localhost:5009";

export const getPatientFlags = async () => {
    const res = await axios.get(`${BASE_URL}/patientFlags`);
    return res.data;
};
