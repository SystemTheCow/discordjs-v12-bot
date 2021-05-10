var colors = require("colors");
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
  console.clear();
  console.log("[Loaded]: ".cyan, `Conectado como ${client.user.username}#${client.user.discriminator}`.white);
	},
};