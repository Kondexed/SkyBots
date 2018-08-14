const sql = require('sqlite');
module.exports.run = async (bot, message, args) => {
    sql.get(`SELECT * FROM scores WHERE ID ="${message.author.id}"`).then(row => {
        if (!row) return message.reply("Your current level is 0");
        message.channel.send(`Your current level is **${row.level}**, <@${message.author.id}>.`);
      });
}

module.exports.help = {
    name: "level"
}