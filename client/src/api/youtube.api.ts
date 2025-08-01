import api from "../configs/axios"


export const AnalyzeVideo = async(url: string) => {
    try {
        const response = await api.post(`/youtube/analyze`,{
            url
        },
            {
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}