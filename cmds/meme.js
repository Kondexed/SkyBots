const snek = module.require("snekfetch");
const api = "https://api.imgflip.com/get_memes";
const fs = require('fs');

module.exports.run = async (bot, message, args) => {

    let msg = await message.channel.send("Generating...");

    let random = Math.floor(Math.random() * 100);
    console.log(random);
    let memes = (await snek.get(api)).body.data;
    let file = memes.memes[random].url;
    let name = memes.memes[random].name;
    if(!file) return message.channel.send("I broke! Try Again");

    console.log(file);

    await message.channel.send({files: [
        {
            attachment: file,
            name: `${name}.png`
        }
    ]});

    msg.delete();
}

module.exports.help = {
    name: "meme"
}