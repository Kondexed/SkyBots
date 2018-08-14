module.exports.run = async (bot, message, args) => {
    if(message === 'colors') {
        let colors = message.guild.roles.filter(role => role.name.startsWith("#"));
        let role = colors.find(str.toLowerCase());
        let str = "#";

        message.channel.send(`Available Colors: ${role}`);
        return

    }


    let colors = message.guild.roles.filter(role => role.name.startsWith("#"));
    if(colors.size < 1) return message.channel.send("There are no colors!");

    let str = args.join(" ");
    let role = colors.find(role => role.name.slice(1).toLowerCase() === str.toLowerCase());

    if(!role) return message.channel.send(`This color does not exist. Possible colors:\n ${colors.array().join(" ")}`);

    try {
        await message.member.removeRoles(colors);
        await message.member.addRole(role);
        message.channel.send(`You now have the color ${role}!`);
    } catch(e) {
        message.channel.send(`Failed! ${e.message}`);
    }
}

module.exports.help = {
    name: "color"
}