module.exports = {
    name: 'ping', 
	aliases: ['pingtwo'],
    args: false, 
	cooldown: 1,
	args: false,
    usage: '', 
	async execute(message, args, client) {
		message.reply("!Pong")
	},
};