 const Discord = require("discord.js");
 const fs = require("fs");
 const ytdl = require("ytdl-core");
 const request = require("request");
 const getYouTubeID = require("get-youtube-id");
 const videoInfo = require("youtube-info");
 const moment = require('moment');
 const sql = require('sqlite');
 sql.open('./score.sqlite');
 
 const prefix = process.env.prefix;
 
 const recentMessage = new Set();
 
 
 const bot = new Discord.Client({disableEveryone: true});
 bot.commands = new Discord.Collection();
 
 var servers = [];
 //Initialization
 
 fs.readdir("./cmds/", (err, files) => {
     if(err) console.error(err);
 
     let jsfiles = files.filter(f => f.split(".").pop() === "js");
     if(jsfiles.length <= 0) {
         console.log("No commands to load!");
         return;
     }
 
     console.log(`Loading ${jsfiles.length} commands!`);
     jsfiles.forEach((f, i) => {
         let props = require(`./cmds/${f}`);
         console.log(`${i+1}: ${f} loaded!`);
         bot.commands.set(props.help.name, props);
     });
 });
 
 //Load commands
 
 bot.on("ready", () => {
     console.log(`Bot is ready ${bot.user.username}`);
     bot.user.setActivity("SkyWars.Com");    
 });
 //Set playing status, and console.log when ready.
 
 bot.on('guildMemberAdd', member => {
     member.addRole(member.guild.roles.find('name', 'Member').id); //Add custom role upon join (Change to ID search?)
     fs.writeFileSync('userList.txt', `\n${member}`, 'utf8'); //Write to user list
     let guild = member.guild;
 
     let welcomeChannel = bot.channels.find('id', '428763647918211084'); //Find welcomeChannel by ID. 
 
     welcomeChannel.send(`Welcome to Skyblock's official discord ${member.user}!`).catch(console.error); //Welcome users in welcomeChannel
 });
 
 bot.on('guildMemberRemove', member => {
     let guild = member.guild;
     guild.defaultChannel.send(`Goodbye ${member.user} :frowning:`); //Custom message, sent when a user leaves guild
 });
 
 bot.on("message", async message => {
 
     let filteredWords = [
         'fuck',
         'dick'
     ] //filter
 
     let filterBypass = [
         '428763114251616256'
     ] //These ID's can bypass filter.
 
     let i = 0;
 
     for(i=0; i<filteredWords.length; i++) {
         const filterEvasionChannel = bot.channels.find('id', '467481035144298526'); //Sends attempted filter evasions to this channel
 
         if(message.content.toLowerCase().includes(filteredWords[i])) {
 
             let m = 0;
 
             for(m=0; m<filterBypass.length; m++) {
                 if(message.author.id === filterBypass[m]) return;
             }
             
             message.delete(250); //Delete message violating the filter after .25 seconds.
 
             filterEvasionChannel.send(`\`\`\`Attempted filter evasion\nUser: ${message.author.tag}\nMessage: ${message.content}\nTime: ${moment().format('L')} ${moment().format('LTS')}\`\`\``);
             //Send to filterEvasionChannel 
             let msg = await message.channel.send(`Watch your language <@${message.author.id}>!`);
             setTimeout(() => {
                 msg.delete();
             }, 5000);
             console.log('Filter evasion detected!'); 
             return;
         } //Asks user to watch language. Deletes itself after 5 seconds.
     }
 
 
     if(message.channel.type !== "dm" && !message.content.startsWith(prefix) && !recentMessage.has(message.author.id) && message.guild.id === '428763647918211082') {
         /*SQLite sytem
             Format:
             [userID, points, level]
 
             Can't gain XP in DM
 
             XP cooldown with recenMessage.has
         */
 
     sql.get(`SELECT * FROM scores WHERE ID ="${message.author.id}"`).then(row => {
         if (!row) {
           sql.run("INSERT INTO scores (ID, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]); //Create row for user, if nonne exists.
         } else {
           let currentLevel = Math.floor(0.1 * Math.sqrt(row.points + 1)); //level = someFunction(points);
           if (currentLevel > row.level) {
             row.level = currentLevel; //Update level if current level is greater than stored level.
             sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE ID = ${message.author.id}`); //Updates
             message.channel.send(`Congratulations <@${message.author.id}>, you have leveled up! You are now level **${currentLevel}**.`) //Level up message.
           }
           sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE ID = ${message.author.id}`); //More updates
         }
       }).catch(() => {
         console.error;
         sql.run("CREATE TABLE IF NOT EXISTS scores (ID TEXT, points INTEGER, level INTEGER)").then(() => {  //Create table if it doesn't exist.
         
           sql.run("INSERT INTO scores (ID, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]); //Prepare table
         });
       });
     }
     /*
    Heroku doesn't allow this
    
    let currentLog = fs.readFileSync('textLog.rtf', 'utf8'); //Get current text log
     let date = moment().format('L');
     let time = moment().format('LTS');
     let logTime = `[${date} ${time}]`; //Get current time.
     fs.writeFileSync('textLog.rtf', `${currentLog}\n\n${logTime} ${message.author.tag} (${message.author.id}):\n ${message}`, 'utf8'); 
    //Write log to file
    */
     if(message.author.bot) return; //Bot can't use it's own commands.
      if (message.channel.type !== "dm" && !message.content.startsWith(prefix)) { //If message is NOT sent in DM
         recentMessage.add(message.author.id); //Add authorID to recentMessage set. Set created above at top ^^^^
 
         setTimeout(() => {
             recentMessage.delete(message.author.id);  //Delete user from recentMessage list after 2500ms, or 2.5 seconds.
             console.log(recentMessage);
         }, 2500);
         console.log(recentMessage); //Log to console
     }
 
     const dmchannel = bot.channels.find("id", "448655044188045324"); //Find by ID instead ???
     if (message.channel.type === "dm") {
         if (message.author.id === bot.user.id) return;
         dmchannel.send(`DM received from **${message.author.tag} (${message.author.id})** : \n\n\`\`\`${message.content}\`\`\``);
         
     }
     if (message.channel.bot) return;
 
     //if(message.channel.type === "dm") return message.author.send('Sorry, but bot commands do not work in DM\'s. Please join https://discord.gg/7Hwmbkz to use Sky Bot!');
     
 
     let messageArray = message.content.split(" "); //messageArray for later use
     let command = messageArray[0].toLowerCase(); //Command is the first "word". Ex: ${botSettings.prefix}Ban someone, ${botSettings.prefix}Ban = command
     args = messageArray.slice(1); //Args - Everything BUT command
 
     if(!command.startsWith(process.env.prefix)) return; //return if does not start with prefix
 
 
     let cmd = bot.commands.get(command.slice(prefix.length));
     if(cmd) cmd.run(bot, message, args); //Run command. Also known as magic stuff.
 
         
 });
 
 bot.login(process.env.token); //Log in with bot token.
