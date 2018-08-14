const date = require('datejs');
const moment = require('moment');

module.exports.run = async (bot, message, args) => {


        message.channel.send(`Your ping: ${message.createdTimestamp - new Date().getTime()} ms`);

}

module.exports.help = {
    name: "ping"
}