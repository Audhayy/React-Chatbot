import axios from 'axios'

const API_KEY = process.envRAPID_API_API_KEY;
console.log('RapidAPI Key used:', API_KEY);
const API_URL = 'https://chatgpt-42.p.rapidapi.com/chat';

export const getChatGPTResponse = async (userMessage) => {
    try {
        const response = await axios.post(
            API_URL,
            {
                messages: [{ role: 'user', content: userMessage }],
                model: 'gpt-4o-mini',
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                    'x-rapidapi-key': API_KEY,
                },
            }
        );
        console.log("ChatGPT Response:", response.data);
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling ChatGPT-4o API', error);
        if (error.response) {
            console.error('API response:', error.response.data);
        }
        return 'Oops! Something went wrong';
    }
};