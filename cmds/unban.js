const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Sorry <@${message.author.id}>, you do not have permission to unban members!`);
    console.log(message);

    //let toBan = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
    //if(!toBan) return message.channel.send(`Please specify a user <@${message.author.id}>`);
    //if(args[0] === message.author.id) return message.channel.send(`Sorry <@${message.author.id}>, you cannot unban yourself!`);
    //if(toBan.highestRole.position >= message.member.highestRole.postion) return message.channel.send(`Sorry <@${message.author.id}>, you cannot unban a member whose role is higher than yours!`);

    //let id = message.author.id;
    //let userLength = id.length;

    //let banReason = args.join(" ").split(args[0]);
    
    //message.reply(message.mentions.users.first().tag);

    if(!args[0]) message.channel.send(`Please specify a user <@${message.author.id}>`);

    fs.writeFileSync('banCount.txt', `${parseInt(fs.readFileSync('banCount.txt', 'utf8')) + 1}`, 'utf8');
    let banCount = fs.readFileSync('banCount.txt', 'utf8');
    //message.channel.send(toBan.id);
    /*let embed = new Discord.RichEmbed()
        .setTitle(`Unbanned User: ${message.mentions.users.first() || args[0]} (ID: ${args[0]})\n`)
        .setAuthor(`Case #${banCount}`)
        .addField(`Unbanning Moderator`, message.author.tag)
        .setFooter(`Timestamp: ${new Date()}`)
        .setColor("#0a0b0c")
        .setThumbnail(message.author.avatarURL);

    message.channel.send({embed: embed});*/

    //toBan.ban(reason = `${banReason}`);
    //message.channel.send(message.guild.member(`${args[0]}`));
    //let unbanMember = args[0].slice(2, -1)
    //message.channel.send(unbanMember);

    //if(args[0]) message.channel.send(`not a number`);

    let unbanSplit = args[0].split('<');
    console.log(unbanSplit);
    console.log(args[0]);
    
    if(unbanSplit.toString() !== args[0].toString()) {
        message.guild.unban(`${args[0].slice(2, -1)}`);
        message.channel.send(`Unbanned ${args[0]}`);

        let embed = new Discord.RichEmbed()
        .setTitle(`Unbanned User: ${message.mentions.users.first().tag} (ID: ${args[0].slice(2, -1)})\n`)
        .setAuthor(`Case #${banCount}`)
        .addField(`Unbanning Moderator`, message.author.tag)
        .setFooter(`Timestamp: ${new Date()}`)
        .setColor("#0a0b0c")
        .setThumbnail(message.author.avatarURL);

        message.channel.send({embed: embed});

    } else if(!isNaN(args[0])) {
        message.guild.unban(`${args[0]}`);
        message.channel.send(`Unbanned <@${args[0]}>`);

        let embed2 = new Discord.RichEmbed()
        .setTitle(`Unbanned User ID: ${args[0]})\n`)
        .setAuthor(`Case #${banCount}`)
        .addField(`Unbanning Moderator`, `${message.author.tag} (${message.author.id})`)
        .setFooter(`Timestamp: ${new Date()}`)
        .setColor("#0a0b0c")
        .setThumbnail(message.author.avatarURL);

        message.channel.send({embed: embed2});
    } else {
        message.channel.send(`Sorry, I could not find that user. Please try again.`);
    }

    //message.guild.unban(`${unbanMember}`);
}

module.exports.help = {
    name: "unban"
}