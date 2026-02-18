const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
    try {
        // 1. Get the user message
        const body = JSON.parse(event.body);
        const userMsg = body.message;

        // 2. Initialize the AI (The part that was missing!)
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // 3. Select the model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // 4. Generate the response
        const result = await model.generateContent(userMsg);
        const response = await result.response;
        const aiText = response.text();

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply: aiText }),
        };
    } catch (error) {
        console.error("Final Error Log:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ reply: "I'm awake, but I hit an error: " + error.message }),
        };
    }
};
