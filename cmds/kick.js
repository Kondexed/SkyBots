const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`Sorry <@${message.author.id}>, you do not have permission to kick members!`);

    let toKick = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
    if(!toKick) return message.channel.send(`Please specify a user <@${message.author.id}>`);
    if(toKick.id === message.author.id) return message.channel.send(`Sorry <@${message.author.id}>, you cannot kick yourself!`);
    if(toKick.highestRole.position >= message.member.highestRole.postion) return message.channel.send(`Sorry <@${message.author.id}>, you cannot kick a member whose role is higher than yours!`);


    if(!args[1]) {
        message.channel.send(`Sorry <@${message.author.id}>, you must provide a reason for the kick!`);
        return
    }
    
    let id = message.author.id;
    let userLength = id.length;

    let kickReason = args.join(" ").split(args[0]);
    toKick.send(`You have been kicked from **${message.guild.name}** by **${message.author.tag}**.\n\`\`\`${kickReason[1].toString()}\`\`\`\nPlease talk to **${message.author.tag}** if you have any questions.`);
    fs.writeFileSync('banCount.txt', `${parseInt(fs.readFileSync('banCount.txt', 'utf8')) + 1}`, 'utf8');
    let banCount = fs.readFileSync('banCount.txt', 'utf8');
    let embed = new Discord.RichEmbed()
        .setTitle(`Kicked User: ${toKick.displayName} (ID: ${toKick.id})\n`)
        .setAuthor(`Case #${banCount}`)
        .addField(`\nKick Reason`, kickReason)
        .addField(`Kicking Moderator`, `${message.author.tag} (${message.author.id})`)
        .setFooter(`Timestamp: ${new Date()}`)
        .setColor("#0a0b0c")
        .setThumbnail(toKick.avatarURL);

    message.channel.send({embed: embed});

    toKick.kick(reason = `${kickReason}`);
}

module.exports.help = {
    name: "kick"
}