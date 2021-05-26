const Discord = require("discord.js"); 
const config = require("./config.json");
const fs = require('fs');
const client = new Discord.Client();
const prefix = "!";

const cp_table = {
	"8": 0.3752356,
	"13": 0.48168495,
	"15": 0.51739395,
	"20": 0.5974,
	"25": 0.667934
}

client.on("message", function(message)
{
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	
	const commandBody = message.content.slice(prefix.length);
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const cmd = args.shift().toLowerCase();
	
	var user_id = message.author.id;
	var user_file = user_id.concat('.json');
	var users_dir = './user_data/';
	user_file = users_dir.concat(user_file);
	
	if (cmd == "hundo")
	{
		/* Template for how the game master stores pkmn data...
		{
			"templateId": "V0318_POKEMON_CARVANHA",
			"data": {
				"templateId": "V0318_POKEMON_CARVANHA",
				"pokemonSettings": {
					"stats": {
						"baseStamina": 128,
						"baseAttack": 171,
						"baseDefense": 39
					}, ...
				}
			}
		},
		*/
		if (!args.length)
			return message.reply("please specify a Pokemon name! Ex: !hundo Minun");
		else
		{
			var pokemon_name = args[0].toUpperCase();
			var search_str = "_POKEMON_" + pokemon_name;
			
			//load json
			var file = fs.readFileSync("game_master.json");
			var json = JSON.parse(file);
			
			//iterate and find the specified mon's rec
			for (var i = 0; i < json.length; i++)
			{
				var obj = json[i];
				if ((obj.templateId).includes(search_str))
				{
					//found the correct obj
					var stats_obj = obj.data.pokemonSettings.stats;
					var stamina = stats_obj.baseStamina;
					var attack = stats_obj.baseAttack;
					var defense = stats_obj.baseDefense;
				}
			}
		}
	}
	else
	{
		if (fs.existsSync(user_file))
		{
			message.reply("found file");
		}
		else
		{
			message.reply("setting you up now. Please re-run your command!");
		}
	}
});

client.login(config.BOT_TOKEN);
