const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
    // Vercel handles the request method check like this:
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const userMessage = req.body.message; // Vercel automatically parses the body

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(userMessage);
        const response = await result.response;
        
        return res.status(200).json({ reply: response.text() });
    } catch (error) {
        console.error("AI Error:", error);
        return res.status(500).json({ error: error.message });
    }
};
