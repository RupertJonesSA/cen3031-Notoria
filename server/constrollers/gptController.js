require("dotenv").config();
const pdfParse = require('pdf-parse');
const OpenAI = require('openai');


const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

const AISummary = async (req, res) => {
    try {
        if (!req.files || !req.files.pdfFile) {
            return res.status(400).send('No file uploaded.');
        }

        let textUser;
        try {
            const result = await pdfParse(req.files.pdfFile.data);
            textUser = result.text;
        } catch (error) {
            console.error("Error while parsing PDF:", error);
            return res.status(500).send('Error processing PDF.');
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "user", "content": `Summarize the following text in detail, ensuring the summary is at least 1000 words. Please cover all key points, major themes, and any important details: ${textUser}`}
            ],
            max_tokens: 1500,
            temperature: 0.3,
            top_p: 1.0,
            frequency_penalty: 0.2,
            presence_penalty: 0.0,
            stop: null
        });

        res.status(200).json({ data: response.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = {
    AISummary
}