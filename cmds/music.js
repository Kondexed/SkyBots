const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const request = require('request');
const botSettings = require('../botSettings.json');
const ytinfo = require('youtube-info');

module.exports.run = async (bot, message, args) => {

    let newArgs = args.slice(1);
    const ytAPI = botSettings.ytapi;

    var guilds = {}

    if (!guilds[message.guild.id]) {

        guilds[message.guild.id] = {
            queue: [],
            queueNames: [],
            isPlaying: false,
            dispatcher: null,
            voiceChannel: null,
        };

    }

    if (args[0].toLowerCase() === `play`) {
        message.channel.send(`Searching: \`${newArgs.join(" ")}\``);

    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply(`Please be in a voice channel first!`);
    request(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${newArgs.join("_")}&key=${ytAPI}`, function (error, response, body) {
        var json = JSON.parse(body);
        let videoID = json.items[0].id.videoId;
        console.log(videoID);
        let link = `https://www.youtube.com/watch?v=${videoID}`
        console.log(link);
        guilds[message.guild.id].queue.push(videoID);
        

        ytinfo(`${videoID}`).then(function (videoInfo) {
            console.log(videoInfo.title);
            console.log(videoInfo);
            guilds[message.guild.id].queueNames.push(videoInfo.title);
            //guilds[message.guild.id].isPlaying = true;
        if(guilds[message.guild.id].isPlaying === false) {
            voiceChannel.join()
            .then(connnection => {
                const stream = ytdl(`https://www.youtube.com/watch?v=${videoID}`, { filter: 'audioonly' });
                const dispatcher = connnection.playStream(stream);
                guilds[message.guild.id].isPlaying = true;
                message.channel.send(`Now playing **${videoInfo.title}**`);
                dispatcher.on('end', () => voiceChannel.leave());
            });
        }
        });
    });

        
    }


    if (args[0].toLowerCase() === 'stop') {
        message.member.voiceChannel.leave();
        guilds[message.guild.id].isPlaying = false; 
    }


    if (args[0].toLowerCase() === 'queue') {
        message.channel.send('hi');
        console.log(guilds[message.guild.id].queueNames[0]);
        console.log(guilds[message.guild.id].queueNames[1]);
        console.log(guilds[message.guild.id].queueNames[2]);
        var nMessage = "```";
        for (var i = 0; i < guilds[message.guild.id].queueNames.length; i++) {
            var temporary = `${i+1}: ${guilds[message.guild.id].queueNames[i]}${i === 0 ? "**(Current Song)**" : ""}\n`;
            if((nMessage + temporary).length <= 2000 -3) {
                nMessage += temporary;
            } else {
                nMessage += "```";
                message.channel.send(nMessage);
                nMessage = "```";
            }
            nMessage += "```";
            message.channel.send("```");
        }
    }
}

module.exports.help = {
    name: "music"
}