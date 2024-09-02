const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.API_KEY;
const config = new GoogleGenerativeAI('AIzaSyBs2HhR49MDULjy1_LScxv11IBAYkocDsk');
const modelId = "gemini-pro";
const model = config.getGenerativeModel({ model: modelId });
const request = require('request')
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const {checkUser,pushTransection,get}=require("./database");

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
const projectId = 'my-project-1552734877290'
// A unique identifier for the given session
console.log(projectId);
const sessionId = uuid.v4();
const credentials = {
  client_email: "findlpt@my-project-1552734877290.iam.gserviceaccount.com",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCExj+jzD4hxwYJ\n9gjqu6R6eeKp/fEnn8kQtLbJymhpIYt15PKCipim38zC/LA2xoUz279I3ps5AeeH\nMQedeDOnKymE5HnAF0MY2MP2wGwsbVvFXZYQ+mTW6RRBSWlCNSWNECQMCizpRL/S\nCcfVxN7j6lmQdwyxCCXnRW7Rg40u5nQfoU7ODhiOdkcUFBVE+aaVyUs+cdtWj9mz\nsd/nfk7lnKbiEX3YkAtFCi9aylh6VN95/9FW/W41uJ3P6cMAW46Rl8D6W7c3LRuQ\nvOK92fja5d8uER+OhXq4h3Nt5B5vkd/EooFv4mIthXCCmrcTpJN3SRhgGL6ej9TY\nDjgUJGDtAgMBAAECggEAHeQs7SEc5slR8nmlscTbR2h7z0X4nfFS2JQ6p4zOO0be\nSQUpVJrDuaPeSxKM0FQapl1lP9A/1VJ4r56p5nlqdYrZzs2KHGUQSb55Raq1372i\nALmsQHfCroBsOzN+AzYIVWzqFJzQ1hZQcgaaKuXmwRxgHA41OQDK2blvtLLfXMyZ\nmeHzs6h2ajBmssxXe5IPERqrO7/BxFfFtDdfVZZXkpkZLYhTLXwzYCMyC5L52TX7\nQbnwrSu4U2ARVG+F0a9Gy5taj4FSgpitYw4E2tP3vf7rnKvSz29Ql1Ynh+SU1OQi\nkWG6FMmGCAK1FvQ8VnT3YPv4/b11CSfPrg0pqpXekQKBgQC5hRpX1P9uHMHyFiCX\n44XnmRjfBhOoxFqAXtmBAXj4CCtfvKCHlN1rQQjO033RcTMY4EJhWA7ZQFR0JQ8V\ngP/mU5bAqtkCFzmDhy5eZRR3tAyslAYynhfCtHQqbzURPecVkMZVqK4Ho9iWkNru\n22w3Lyxsb8wE0pQPLYqTF5+VvQKBgQC3N1XY3N4rLl1DO/Q46TxICgyzwDaByzOB\nLZQmeVcZNaJii6JFCWEI4zKnpk8cGlwqpHWei+SKQpMLtx194yQ/UZy6LjmPX/te\nDh8jeY4JZFQhqUp6XdHYpEfprle6pKFzkJLwDTjtxL8kTsDQUtBZTFXPBd0M5at7\nycZQ5Sey8QKBgEZOyEYDJe6QHXxmoGGPy56S6dcT0X2DNJ0z1RBMA5FUX0PAE8Ju\nS1+rXPAtPKCUWv4Rd3a2zaHN/HOr28SVh+W9RgOse+OL87MCFzOU8SXQaYE59ANY\n4L5cby3pyV3IbPxCSrgJ3jJtCNc+/InLRH7BdP9/ev1U5OG/q6XFLSitAoGAcH7Z\nhz6Wa40cVpwJaKhNCy6gff4Xebp69WY3ASigAiqcekWibSFFI1/dSnMjP+4viT9R\nuPfMa9hU0Wyt/w3ow7gos2iOjyov/aBOHkoUnE+uGL0JrfjNUGgOf708wK01NPAg\nSKTVv6h+dJymZ0NyCmKEjYjcIX8ju+44hpMtvQECgYAR+XshE1Yd3fP8pwGWsCv0\nrZUjVR9T40c6cPbkDwoIZdKJM6CPTA0Gnhi4z6uXB7Qwmw/9lEDyITfaoomHhssY\nRpeGVa4Blrfq5zwLGBy9ppu2N02GmuXa/mOtsCNZtrcB/HNBdTh0DGxRcK3pqfUR\n4SffDwqlojFzR/ge5zpsvQ==\n-----END PRIVATE KEY-----\n",
};
// Create a new session

const sessionClient = new dialogflow.SessionsClient({credentials:credentials,
});
const sessionPath = sessionClient.projectAgentSessionPath(
  projectId,
  sessionId
);


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
      let userid=req.body.events[0].source.userId
      console.log(req.body);
    //   const { prompt } = req.body;
    //   console.log(prompt);
      //const result = await model.generateContent(msg);
      //console.log(result.response.candidates[0].content.parts[0].text);
      //console.log(result.response.candidates[0].content.parts[0].text);
      runSample(reply_token,msg,userid);
      //reply(reply_token, result.response.candidates[0].content.parts[0].text)  

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
async function runSample(reply_token,text,userId) {

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: text,
        // The language used by the client (en-US)
        languageCode: 'th-TH',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(result);
  // console.log(result.parameters.fields.Amont.listValue.values[0].structValue.fields.amount.numberValue);
  // console.log(result.parameters.fields.Transaction.listValue.values[0].stringValue);

  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if(result.intent.displayName=="Question"){
    reply(reply_token,textGEMINI)
  }
  else if (result.intent.displayName=="income - custom - yes") {
    console.log(`  Intent: ${result.intent.displayName}`);
    //pushTransection(userid,0,userId);
    reply(reply_token,result.fulfillmentText)

  }  
  else if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
    reply(reply_token,result.fulfillmentText)

  }
  else {
    console.log('  No intent matched.');
    reply(reply_token,textGEMINI)

  }
}