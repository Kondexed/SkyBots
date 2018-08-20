const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {

    let banLog = bot.channels.find('id', '466397801585311754');
    
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Sorry <@${message.author.id}>, you do not have permission to ban members!`);

    let toBan = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]) || bot.users.find('id', `${args[0]}`);
    if(!toBan) return message.channel.send(`Please specify a user <@${message.author.id}>`);
    //if(toBan.id === message.author.id) return message.channel.send(`Sorry <@${message.author.id}>, you cannot ban yourself!`);
    if(toBan.highestRole.position >= message.member.highestRole.postion) return message.channel.send(`Sorry <@${message.author.id}>, you cannot ban a member whose role is higher than yours!`);


    if(!args[1]) {
        message.channel.send(`Sorry <@${message.author.id}>, you must provide a reason for the ban!`);
        return
    }
    
    let id = message.author.id;
    let userLength = id.length;

    let banReason = args.join(" ").split(args[0]);
    toBan.send(`You have been banned from **${message.guild.name}** by **${message.author.tag}**\nBan Reason:**${banReason[1].toString()}**. \nPlease talk to **${message.author.tag}** if you have any questions, or would like to appeal.`);
    fs.writeFileSync('banCount.txt', `${parseInt(fs.readFileSync('banCount.txt', 'utf8')) + 1}`, 'utf8');
    let banCount = fs.readFileSync('banCount.txt', 'utf8');
    let embed = new Discord.RichEmbed()
        .setTitle(`Banned User: ${toBan.displayName} (ID: ${toBan.id})\n`)
        .setAuthor(`Case #${banCount}`)
        .addField(`\nBan Reason`, banReason)
        .addField(`Banning Moderator`, `${message.author.tag} (${message.author.id})`)
        .setFooter(`Timestamp: ${new Date()}`)
        .setColor("#0a0b0c")
        .setThumbnail(toBan.avatarURL);

    banLog.send({embed: embed});

    toBan.ban(reason = `${banReason}`);

    //message.channel.send(message.guild.member(`${args[0]}`));
    //message.guild.unban(`${args[0]}`);
}

module.exports.help = {
    name: "ban"
}
