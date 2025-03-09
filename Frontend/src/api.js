import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchCampaigns = async () => {
    const response = await axios.get(`${API_URL}/campaigns`);
    return response.data;
};

export const createCampaign = async (data, token) => {
    const response = await axios.post(`${API_URL}/campaigns`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
