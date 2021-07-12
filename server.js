require('dotenv').config()



//!
//! Discord
//!

const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
client.login(process.env.TOKEN)

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`)
})



//!
//! Commands
//!

client.on('message', msg => {

	if (msg.content.charAt(0) !== '!') return

	var cmd = {
		"opt": msg.content.substring(1).split(' ')[0],
		"args": msg.content.split(' ').shift(),
		"msg": msg,

		"guild": msg.guild,
		"member": msg.member
	}

	try {
		require(`./commands/${cmd.opt}.js`)(client, cmd)
	} catch (err) {console.log(err)}
})



//!
//! Modules
//!

//require('./auto/control.js')(client)