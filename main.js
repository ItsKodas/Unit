//!
//! Modules
//!

const fs = require('fs')
process.env = JSON.parse(fs.readFileSync('./config.json', 'utf8'))



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



//!
//! Express
//!

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.listen(process.env.port, () => console.log(`Listening on port ${process.env.port}!`))


app.get('/', (req, res) => {
	var Packs = []
	fs.readdirSync('./lib').forEach(file => Packs.push(file.split('_')[1].split('.')[0]))
	res.render('index', { Packs: Packs })
})

app.get('/discord', (req, res) => res.redirect('https://discord.gg/qf8htxxMKD'))

fs.readdirSync('./lib').forEach(file => {
	var url = file.split('_')[1].split('.')[0]
	app.get(`/${url}`, (req, res) => res.download(`./lib/${file}`))
})