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
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    reply(reply_token, msg)
    res.sendStatus(200)
})
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
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