const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.API_KEY;
const config = new GoogleGenerativeAI('AIzaSyBs2HhR49MDULjy1_LScxv11IBAYkocDsk');
const modelId = "gemini-pro";
const model = config.getGenerativeModel({ model: modelId });

exports.handleGenerateRequest = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt);
    const result = await model.generateContent(req.body.text);
    res.json({ response: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while generating content.");
  }
};