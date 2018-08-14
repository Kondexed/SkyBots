module.exports.run = async (bot, message, args) => {

    if(message.author.id !== '222479899808628736') return;

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
            console.log(link);
            message.channel.send(`Use this link to invite SkyBot to your server!\n${link}`);
        } catch(e) {
            console.log(e.stack);
        }
}

module.exports.help = {
    name: "invite"
}