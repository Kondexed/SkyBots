const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.author;

    let embed = new Discord.RichEmbed()
        .setAuthor(`${target.username}`)
        .setDescription("This is the user's info")
        .setColor("#9B59B6")
        .addField("Full Username", target.tag)
        .addField("ID", target.id)
        .addField("Created On", target.createdAt)
        .setThumbnail(target.avatarURL);

    message.channel.send({embed: embed});
}

module.exports.help = {
    name: "userinfo"
}