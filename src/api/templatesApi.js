import axios from "axios";

const BASE_URL = "http://localhost:5013";

export const getNoteTemplates = async () => {
    const res = await axios.get(`${BASE_URL}/noteTemplates`);
    return res.data;
};

export const createNoteTemplate = async (payload) => {
    const res = await axios.post(`${BASE_URL}/noteTemplates`, payload);
    return res.data;
};

export const deleteNoteTemplate = async (id) => {
    const res = await axios.delete(`${BASE_URL}/noteTemplates/${id}`);
    return res.data;
};

export const getMacros = async () => {
    const res = await axios.get(`${BASE_URL}/macros`);
    return res.data;
};

export const deleteMacro = async (id) => {
    const res = await axios.delete(`${BASE_URL}/macros/${id}`);
    return res.data;
};

export const createMacro = async (payload) => {
    const res = await axios.post(`${BASE_URL}/macros`, payload);
    return res.data;
};
