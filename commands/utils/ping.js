module.exports = {
	name: 'ping', 
	aliases: ['pingtwo'],
	args: false, 
	cooldown: 1,
	usage: '', 
	async execute(message, args, client) {
		message.reply("!Pong")
	},
};
