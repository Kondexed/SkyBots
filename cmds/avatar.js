module.exports.run = async (bot, message, args) => {

    let target = message.mentions.users.first() || bot.users.find('id', `${args[0]}`) || message.author

    let msg = await message.author.send(`Generating ${target.tag}\'s avatar...`);

    await message.author.send({files: [
        {
            attachment: target.displayAvatarURL,
            name: "avatar.png",
        }
    ]});
    
    msg.delete();

    message.author.send(`${target.tag}\'s profile picture.`);
    

}

module.exports.help = {
    name: "avatar"
}