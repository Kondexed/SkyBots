const snek = module.require("snekfetch");
const api = "https://dog.ceo/api/breeds/image/random";


module.exports.run = async (bot, message, args) => {

    let msg = await message.channel.send("Generating...");

    let file = (await snek.get(api)).body.message;
    if(!file) return message.channel.send("I broke! Try Again");

    console.log(file);

    await message.channel.send({files: [
        {
            attachment: file,
            name: file.split("/").pop()
        }
    ]});

    msg.delete();
}

module.exports.help = {
    name: "dog"
}