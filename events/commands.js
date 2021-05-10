const Discord = require("discord.js");
const cooldowns = new Discord.Collection();
prefix = "!";
module.exports = {
	name: 'message',
	async execute(message, client) {
    if (message.author.bot) return;
  	if (message.channel.type === "dm") return;
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command =
        client.commands.get(commandName) ||
        client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );
    if (!command) return;
    if (command.args && !args.length) {
        let reply = "Este comando requiere más detalles.";
        if (command.usage) {
        reply += `\nEl uso correcto de este comando es: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;
    if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    } else {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
        const timeLeft = (expirationTime - now);
        return message.reply(`Espera **${humanizeDuration(timeLeft.toFixed(0), { language: "es", maxDecimalPoints: 0 })}** para ejecutar \`${command.name}\` denuevo!`);
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    try {
		command.execute(message, args, client)
    } catch (error) {
        console.error(error);
        message.reply("Ocurrio un error al ejecutar eso");
    }
	},
};