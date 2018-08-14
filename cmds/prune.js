


module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission!");

    const amount = parseInt(args[0]) + 1;

if (isNaN(amount)) {
    return message.reply('Please enter a valid number!');
}
else if (amount <= 1 || amount > 100) {
    return message.reply('Please input a number between 1 and 99!');
}

message.channel.bulkDelete(amount, true).catch(err => {
    console.error(err);
    message.channel.send('An error has occured! Please try again.');
});
}

module.exports.help = {
    name: "prune"
}