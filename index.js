const Discord = require("discord.js"); 
const config = require("./config.json");
const fs = require('fs');
const client = new Discord.Client();
const prefix = "!";

client.on("message", function(message)
{
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	
	const commandBody = message.content.slice(prefix.length);
	const args = message.content.slice(prefix.length).trim().split(' ');
	const cmd = args.shift().toLowerCase();
	
	var user_id = message.author.id;
	var user_file = user_id.concat('.json');
	var users_dir = './user_data/';
	user_file = users_dir.concat(user_file);
	
	if (fs.existsSync(user_file))
	{
		message.reply("found file");
	}
	else
	{
		message.reply("setting you up now. Please re-run your command!");
	}
});

client.login(config.BOT_TOKEN);
