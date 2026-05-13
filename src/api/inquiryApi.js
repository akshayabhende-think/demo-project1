import axios from "axios";

const BASE_URL = "http://localhost:5000/inquiries";

export const getInquiries = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
}

export const deleteInquiry = async (id) => {
    return axios.delete(`${BASE_URL}/${id}`)
}