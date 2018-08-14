const Discord = require('discord.js');
const snek = require("snekfetch");
const fs = require('fs');
const UUID = 'https://api.mojang.com/users/profiles/minecraft/';
const skin = 'https://crafatar.com/renders/body/';

module.exports.run = async (bot, message, args) => {
	if(!args) return message.channel.send('No arguments found! Please enter a valid username.');

	let msg = await message.channel.send('Generating skin...');

	let getUUID = (await snek.get(`${UUID}${args[0]}`)).body.id;

	if(!getUUID) message.channel.send('No user found by that name. Please try again!');

	//let skin = (await snek.get(`${skin}${getUUID}`));

	let mcskin = `${skin}${getUUID}?overlay=true.png`;

	await message.channel.send({files: [
			{
				attachment: mcskin,
				name: `${args[0]}.png`
			}
		]
	});

	msg.delete();



}

module.exports.help = {
    name: "mcskin"
}