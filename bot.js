const { Configuration, OpenAIApi } = require("openai");
const config = require("./config.json");
const { speak } = require("./textToSpeech");
const configuration = new Configuration({
  apiKey: config.apiKey,
});

// Define an async function that uses OpenAI API to generate a response to a topic
async function getAiResponse(topic) {
  const openai = new OpenAIApi(configuration);
  // Necessary if used with prefix
  //const args = message.content.slice(prefix.length).trim().split(/ +/);
  //const prompt = `Conversation with ${text}\nUser: ${text}\nAI:`;
  //const messages = [{ content: topic, user: true }];
  const messages = [{ role: "user", content: topic }];

  // Generate a completion response for the given topic using OpenAI's text-davinci-003 model
  const completion = await openai.createCompletion({
    //!for gpt-3.5! const completion = await openai.createChatCompletion({
    // model: "gpt-3.5-turbo-0301",
    model: "text-davinci-003",
    prompt: topic,
    // !for gpt-3.5! messages: messages,
    max_tokens: 1024,
    n: 1,
    stop: null,
    // Adjust the randomness of the response, higher value means more random
    temperature: 0.2,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  // Extract the response from the completion and return it
  const chatResponse = completion.data.choices[0].text.trim();
  // !for gpt-3.5! const chatResponse = completion.data.choices[0].message;
  console.log(chatResponse);
  return chatResponse;
}

module.exports = { getAiResponse };
