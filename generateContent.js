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
exports.handleGenerateRequestLine = async (req, res) => {
    try {
      let reply_token = req.body.events[0].replyToken
      let msg = req.body.events[0].message.text
      reply(reply_token, msg)  
    //   const { prompt } = req.body;
    //   console.log(prompt);
      const result = await model.generateContent(msg);
      console.log(result);
    // return result; 
      res.status(200)
    } catch (error) {
      console.error(error);
    //  return result;
      res.status(500).send("An error occurred while generating content.");
    }
  };
  function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer BrNPhLaaBLY8PfG8xGXQx5xMqHORaVg3ZmBDywQlCofl/FsnRD4L4u4GoxJ55oS7AievR0UahaEY2l5C9BGBeG9ZpeAOYuW+XR3eDQm/0QYYEyU85amf9m5pLNrgEFJL7wASC+mnghEQpXdlRYTNjgdB04t89/1O/w1cDnyilFU='
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}