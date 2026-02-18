const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
    try {
        const { message } = req.body;
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(message);
        const response = await result.response;
        return res.status(200).json({ reply: response.text() });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
