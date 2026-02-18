const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
    // Only allow POST requests (sending data)
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { message } = JSON.parse(event.body);
        
        // This connects to the Secret Key you saved in Netlify Settings
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Simple instructions for the AI to help village people
        const prompt = `You are a helpful assistant for a village internet service. 
        The user is a villager who might not know English well. 
        Use very simple words. Be very kind. 
        If they have a problem, tell them you are looking into it.
        User message: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply: response.text() }),
        };
    } catch (error) {
        console.error("AI Error:", error);
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: "The AI is sleeping. Try again later." }) 
        };
    }
};
