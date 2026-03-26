import axios from 'axios';


const API_URL = import.meta.env.VITE_API_BASE_URL; 

export const submitClaimData = async (claimData) => {
    try {
        const response = await axios.post(`${API_URL}/submit-claim`, claimData);
        return response.data;
    } catch (error) {
        console.error("Error submitting claim:", error);
        throw error;
    }
};

export const fetchAllClaims = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-claims`);
        return response.data;
    } catch (error) {
        console.error("Error fetching claims:", error);
        throw error;
    }
};