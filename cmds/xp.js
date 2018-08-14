const sql = require('sqlite');
module.exports.run = async (bot, message, args) => {
    sql.get(`SELECT * FROM scores WHERE ID ="${message.author.id}"`).then(row => {
        if (!row) return message.channel.send(`Sorry <@${message.author.id}>, you have no experience points yet.`);
        message.channel.send(`You currently have **${row.points}** experience points, <@${message.author.id}>.`);
      });
}

module.exports.help = {
    name: "xp"
}