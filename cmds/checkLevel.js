const sql = require('sqlite');
module.exports.run = async (bot, message, args) => {
    if(!message.mentions.users.first() && isNaN(args[0])) return message.channel.send(`Please specify a user <@${message.author.id}>!`);
    if(!isNaN(args[0])) {
        let user = bot.users.find('id', `${args[0]}`);
        if(!user) return message.channel.send(`Sorry <@${message.author.id}>, we could not find that user. Please try again.`);
        sql.get(`SELECT * FROM scores where ID ="${user.id}"`).then(row => {
            if (!row) return message.channel.send(`${user.tag} has no experience points!`);
            message.channel.send(`${user.tag} has ${row.points} experience points!`);
        });
    } else {
        sql.get(`SELECT * FROM scores WHERE ID ="${message.mentions.users.first().id}"`).then(row => {
          if (!row) return message.channel.send(`${message.mentions.users.first().tag} has no experience points!`);
          message.channel.send(`${message.mentions.users.first().tag} has ${row.points} experience points!`);
        });
    }
}

module.exports.help = {
    name: "cl"
}