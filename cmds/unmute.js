module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission.");
    
    
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
    if(!toMute) return message.channel.send("You did not specify a user mention or ID.");

    if(toMute.id === message.author.id) return message.channel.send("You cannot unmute yourself");
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot unmute a member whose role is higher than or equal to yours.");

    let role = message.guild.roles.find(r => r.name === "Muted");
   
    if(!role || !toMute.roles.has(role.id)) return message.channel.send("This user is not muted.");

    await toMute.removeRole(role);
    banLog.send(`Unmuted ${toMute.tag}.`);
}

module.exports.help = {
    name: "unmute"
}
