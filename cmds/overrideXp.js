const sql = require('sqlite');
module.exports.run = async (bot, message, args) => {
      //!oxp <user> <new xp>

      let user = message.mentions.users.first() || bot.users.find('id', `${args[0]}`) || message.author;
      let newXp = args[1];

      if(!user) return message.channel.send(`Please specify a user <@${message.author.id}>`);
      if(isNaN(args[1])) return message.channel.send(`Please provide a valid number <@${message.author.id}>`);

      sql.get(`SELECT * FROM scores WHERE ID ="${user.id}"`).then(row => {
        if (!row) {
          sql.run("INSERT INTO scores (ID, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]); //Create row for user, if nonne exists.
          message.channel.send('This user has no experience!');
        } else {
          let currentLevel = Math.floor(0.1 * Math.sqrt(row.points + 1)); //level = someFunction(points);
          if (currentLevel > row.level) {
            row.level = currentLevel; //Update level if current level is greater than stored level.
            sql.run(`UPDATE scores SET points = ${newXp}, level = ${row.level} WHERE ID = ${user.id}`); //Updates
            message.channel.send(`Congratulations <@${user.id}>, you have leveled up! You are now level **${currentLevel}**.`) //Level up message.
          }
          sql.run(`UPDATE scores SET points = ${newXp} WHERE ID = ${user.id}`); //More updates
        }
      })
      
}

module.exports.help = {
    name: "oxp"
}