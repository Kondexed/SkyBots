const Discord = require('discord.js');
const fs = require('fs');
let ansnum;

module.exports.run = async (bot, message, args) => {

    if(!args[0]) return message.channel.send('Please ask a question!');

    let number = fs.readFileSync('8ball.txt', 'utf8');

    let ansnum = parseInt(number);

    let newNumber = ansnum + 1

    fs.writeFileSync('8ball.txt', `${newNumber}`, 'utf8')


    ansnum = ansnum + 1

    let rnumber = Math.floor(Math.random() * 7 );

    let responses = ["Yes.", "No.", "Probably.", "Maybe.", "Definitely not.", "Ask again.", "That's a stupid question."];

    let colorStuff = ['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f'];
    let randomHex1 = Math.floor(Math.random() * 22);
    let randomHex2 = Math.floor(Math.random() * 22);
    let randomHex3 = Math.floor(Math.random() * 22);
    let randomHex4 = Math.floor(Math.random() * 22);
    let randomHex5 = Math.floor(Math.random() * 22);
    let randomHex6 = Math.floor(Math.random() * 22);

/*    let embed = new Discord.RichEmbed()
        .setAuthor(`Question asked by ${message.author.tag}`)
        .setDescription(`Question: ${args.join(" ")}`)
        .setColor(`#${colorStuff[randomHex1]}${colorStuff[randomHex2]}${colorStuff[randomHex3]}${colorStuff[randomHex4]}${colorStuff[randomHex5]}${colorStuff[randomHex6]}`)
        .addField("Response", responses[rnumber])
        .setFooter(`Total questions answered: ${ansnum}`)
        .setThumbnail(message.author.avatarURL);

    message.channel.send({embed: embed});*/

    message.channel.send({embed: {
        color: `${Math.floor(Math.random() * 9999999)}`,
        author: {
            name: message.author.tag,
            icon_url: message.author.avatarURL
        },
        footer: {
          icon_url: bot.avatarURL,
          text: `Question: ${ansnum}`  
        },
        fields: [

            {
                name: `Question`,
                value: `${args.join(" ")}`
            },

            {
            name: 'Response',
            value: `${responses[rnumber]}`
            }
    ]
    }});

}

module.exports.help = {
    name: "8ball"
}