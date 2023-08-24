// const axios = require("axios");
// const config = require("./config.json");

// async function getStreamStatus(channelName) {
//   try {
//     const response = await axios.get(
//       `https://api.twitch.tv/helix/streams?user_login=${channelName}`,
//       {
//         headers: {
//           "Client-ID": config.twitchClientID,
//           Authorization: `Bearer <${config.twitchClientSecret}>`,
//         },
//       }
//     );

//     const streamData = response.data.data[0];
//     return streamData ? streamData.type : null;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// module.exports = { getStreamStatus };
