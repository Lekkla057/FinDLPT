const express = require("express");
const { handleGenerateRequest } = require("./generateContent");
const bodyParser = require('body-parser')
const request = require('request')
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Node.js and Google Gemini integration example");
});
app.post("/generate", handleGenerateRequest);
app.post('/webhook', handleGenerateRequestLine);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
