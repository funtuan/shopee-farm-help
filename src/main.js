const axios = require('axios');
const linebot = require('linebot');
require('dotenv').config();

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

bot.on('message', function(event) {
  const text = event.message.text;
  const start = text.indexOf('/farm/share.html?skey=');
  const end = text.indexOf('&schannel=');
  if (start !== -1 && end !== -1) {
    const sKey = text.slice(start + 22 , end);
    helpFriend(sKey);
    event.reply('園丁出發幫你澆水五次囉😉').then(function (data) {
    }).catch(function (error) {
    });
  }
});

function helpFriend(sKey, count=5) {
  for (let index = 0; index < count; index++) {
    setTimeout(() => {
      axios.post('https://games.shopee.tw/farm/api/friend/anonymous/help', {
        shareKey: sKey,
        schannel: 'LINE',
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }, index * 1000);
  }
}

console.log('server start!');
bot.listen('/webhook', 3000);