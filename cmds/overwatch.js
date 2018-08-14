const snekfetch = require('snekfetch');


module.exports.run = async (bot, message, args) => {

//Test Command - Not fully functional yet. I just need to fix some formatting stuff, and work on the output. 
        if(message.author.id !== '222479899808628736') return message.channel.send(`Sorry <@${message.author.id}>, you do not have permission to use this command`);
    let tag = args[0];
    let splitTag = tag.split('#');
    let newTag = splitTag.join('-');
    console.log(newTag);
    console.log(tag);
    console.log(splitTag);

    var region;
    var play;

    if(!region) {
        region = 'us';
    } else {
        region = args[2]
    }

    if(!play) {
        play = 'pc';
    } else {
        play = args[1]
    }

    let owLink = `https://owjs.ovh/all/${play}/${region}/${newTag}`;
    console.log(owLink);
    let user = (await snekfetch.get(owLink)).body.profile;
    message.channel.send(user.nick);
}

module.exports.help = {
    name: "ow"
}