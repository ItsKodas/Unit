module.exports = function (client, cmd) {
    var muted = []


    if (!cmd.member.roles.cache.some(role => role.name === 'Staff')) return
    cmd.msg.delete()


    if (cmd.msg.mentions.users.map(user => user).length === 0) return cmd.msg.channel.send({ embed: { "description": "❌ You need to Mention the User/s to Mute them!", "color": "#f53b3b" } }).then(msg => msg.delete({ timeout: 5000 }))


    for (user of cmd.msg.mentions.users.map(user => user)) {
        muted.push(user.id)

        var toBeMuted = client.guilds.cache.get(cmd.guild.id).members.cache.get(user.id)

        toBeMuted.roles.add(cmd.guild.roles.cache.find(role => role.name === 'Muted'))
    }


    if (muted.length > 1) {
        var userList = '>>> '
        for (user of muted) {
            userList += `<@${user}>\n`
        }

        return cmd.msg.channel.send({
            embed: {
                "description": `✅ The Following Users have been Muted:\n\n${userList}`,
                "color": "#48cf4b",
                "footer": {
                    "text": `Executed by ${cmd.member.user.tag}`
                }
            }
        })
    } else {
        return cmd.msg.channel.send({
            embed: {
                "description": `✅ <@${muted[0]}> has been Muted!`,
                "color": "#48cf4b",
                "footer": {
                    "text": `Executed by ${cmd.member.user.tag}`
                }
            }
        })
    }
}