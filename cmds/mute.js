module.exports.run = async (bot, message, args) => {
    
    let banLog = bot.channels.find('id', '466397801585311754');

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission.");
    
    
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
    if(!toMute) return message.channel.send("You did not specify a user mention or ID.");
    if(toMute.id === message.author.id) return message.channel.send("You cannot mute yourself");
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot mute a member whose role is higher than or equal to yours.");

    let role = message.guild.roles.find(r => r.name === "Muted");
    if(!role) {
        try{
            let role = await message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []

            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch(e) {
            console.log(e.stack);
        }
    }
    if(toMute.roles.has(role.id)) return message.channel.send("This user is already muted.");
    await toMute.addRoles(role);
    banLog.send(`Muted ${toMute.tag}.`);
}

module.exports.help = {
    name: "mute"
}
