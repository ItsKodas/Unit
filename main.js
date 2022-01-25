process.env = require('./config.json')


//!
//! Discord
//!

const { Client, Intents } = require('discord.js')
var selectedIntents = []
for (intent in Intents.FLAGS) { selectedIntents.push(Intents.FLAGS[intent]) }
const client = new Client({ intents: selectedIntents })
client.login(process.env.token)

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}!`)

	require('./auto/monitor.js')(client)
	require('./auto/recruitment.js')(client)
})



//!
//! Commands
//!

client.on('messageCreate', msg => {
	if (msg.content.charAt(0) !== process.env.prefix) return

	var cmd = {
		"opt": msg.content.substring(1).split(' ')[0],
		"args": msg.content.split(' ').shift(),
		"msg": msg,

		"guild": msg.guild,
		"member": msg.member
	}

	try {
		require(`./commands/${cmd.opt}.js`)(client, cmd)
	} catch (err) { console.log(err) }
})