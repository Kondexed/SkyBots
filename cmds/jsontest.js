const api = "https://www.skyblock.net";
const snekfetch = require("snekfetch");
const Discord = require("discord.js");
const fs = require('fs');
const htmlToJson = require('html-to-json');
const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const http = require('http');
const rp = require('request-promise');
const overwatch = require('overwatch-js');

module.exports.run = async (bot, message, args) => {

    if(message.author.tag !== 'Michael#3287') return message.channel.send('You do not have permission to use this command.');

    snekfetch.get(api).then(r => {
        console.log(r.body);
        let body = r.body;
        let id = Number(args[0]);
        if(!id) return message.channel.send("Supply an ID");
        if(isNaN(id)) return message.channel.send("Supply a valid number!");

        let entry = body.find(post => post.id === id);
        if(!entry) return message.channel.send("This entry does not exist!");

        let embed = new Discord.RichEmbed()
            .setAuthor(entry.title)
            .setDescription(entry.body)
            .addField("Author ID", entry.userId)
            .setFooter("Post ID: " + entry.id);

        message.channel.send({embed: embed});
    });
    snekfetch.get('https://owjs.ovh/all/pc/us/Scorv-11501')
        .then(r => fs.writeFileSync('filter.rtf', r.body));


}

module.exports.help = {
    name: "json"
}