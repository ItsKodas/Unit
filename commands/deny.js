module.exports = function (client, cmd) {

    if (!cmd.member.roles.cache.some(role => role.name === 'Recruiters')) return
    cmd.msg.delete()

    if (cmd.msg.mentions.users.map(user => user).length === 0) return cmd.msg.channel.send({ embed: { "description": "❌ You need to Mention the User to Deny their Recruitment!", "color": "#f53b3b" } }).then(msg => msg.delete({ timeout: 5000 }))

    var user = cmd.guild.members.cache.get(cmd.msg.mentions.users.first().id)

    if (!user._roles.includes(cmd.guild.roles.cache.find(role => role.name === 'Awaiting Recruitment').id)) return cmd.msg.channel.send({ embed: { "description": "🚫 This user is not Awaiting Recruitment!", "color": "#f53b3b" } }).then(msg => msg.delete({ timeout: 5000 }))

    user.roles.remove(cmd.guild.roles.cache.find(role => role.name === 'Awaiting Recruitment'))
    user.kick(`Their Recruitment was Denied by ${cmd.member.user.tag}`)

    return cmd.msg.channel.send({
        embed: {
            "description": `❌ <@${user.id}> has been Denied!`,
            "color": "#f57c31",
            "footer": {
                "text": `Executed by ${cmd.member.user.tag}`
            }
        }
    })
}