const urban = module.require('urban');
const Discord = module.require('discord.js');
const fs = require("fs");
const ytdl = require("ytdl-core");
const request = require("request");
const getYouTubeID = require("get-youtube-id");
const videoInfo = require("youtube-info");
const moment = require('moment');
module.exports.run = async (bot, message, args) => {

    message.channel.send({embed: {
        color: 3447003,
        author: {
          name: message.author.username,
          icon_url: message.author.avatarURL
        },
        title: 'Test Embed:',
        url: 'http://google.com',
        description: 'This is a test embed.',
        fields: [
          {
            name: 'New Field',
            value: 'Headlines'
          },
          {
            name: 'Masked Links',
            value: '[click](https://www.google.com)'
          },
          {
            name: 'Markdown',
            value: '*Mark*__down__'
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: message.author.avatarURL,
          text: 'Testing'
        }
      }});

      let date = moment().format('L');
      let time = moment().format('LTS');
      message.channel.send(`[${date} ${time}]`);


}

module.exports.help = {
    name: "test"
}