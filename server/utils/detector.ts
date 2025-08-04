import axios from 'axios';

const SAPLING_API_KEY = process.env.SAPLING_API_KEY!;

export const detectAIText = async (text: string): Promise<number> => {
    try {
        const res = await axios.post(
            'https://api.sapling.ai/api/v1/aidetect',
            {
                key: SAPLING_API_KEY,
                text
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return res.data.score; // AI probability
    } catch (err) {
        console.error('AI Detection Failed:', err);
        return -1; // fallback in case of error
    }
};
