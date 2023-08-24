const { Client, Events, GatewayIntentBits } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const config = require("./config.json");
const { getAiResponse } = require("./bot.js");
const { getStreamStatus } = require("./twitch");
const prefix = "!";
const channelName = "loltyler1";
const { generateSpeech } = require("./textToSpeech");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  // Search for the channel using its name
});
client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix) && !message.author.bot) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
      message.reply("Pong!");
    } else if (command === "hello") {
      message.reply("Hi there!");
    } else if (command === "sup") {
      message.reply("YOOOOOOOOOOOOOO");
    }
    // !ask command to trigger bot response
    // if (command === "ask") {
    //   const topic = args.join(" ");
    //   const aiResponse = await getAiResponse(topic);
    //   message.channel.send(aiResponse);
    // }
  }
  if (!message.author.bot) {
    const aiResponse = await getAiResponse(message.content);
    // Avoid sending empty messages
    if (aiResponse.trim() != "") {
      const maxLength = 2000;
      // Split response into chunks of maximum length
      const chunks =
        aiResponse.match(new RegExp(`[\\s\\S]{1,${maxLength}}`, "g")) || [];

      for (const chunk of chunks) {
        message.channel.send(chunk);
      }
    } else {
      console.log("Empty Response, Error");
    }
  }
});

// This function will be called every minute to check if the stream is live
/*
async function checkStream() {
  const streamStatus = await getStreamStatus(channelName);
  if (streamStatus === "live") {
    // the stream is live
    console.log("Stream is live!");
    const twitchUrl = `https://www.twitch.tv/detockz`;
    const channel = client.channels.cache.find(
      (channel) => channel.name == config.mainChannelName
    );
    channel.send(`The stream is live! Watch it here: ${twitchUrl}`);
  } else {
    console.log("Stream is not live");
  }
}
// Call the function once to start checking immediately
checkStream();

// Set up a timer to call the function every minute
setInterval(checkStream, 60000);*/

client.login(config.token);
