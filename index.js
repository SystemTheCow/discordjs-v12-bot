const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();

//<--------------------------------------Declaraciones----------------------------------------------------->

client.commands = new Discord.Collection();
  console.clear();
  const commandFolder = fs.readdirSync("./commands");
  for (const folder of commandFolder) {
    const commandFile = fs.readdirSync(`./commands/${folder}`);
    for (const file of commandFile) {
      const command = require(`./commands/${folder}/${file}`);
      client.commands.set(command.name, command);
    }
  }

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

//<--------------------------------------------Handler------------------------------------------------------>

client.login("tu-token-aqui");
