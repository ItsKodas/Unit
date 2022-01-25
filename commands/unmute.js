module.exports = function (client, cmd) {
    var unmuted = []


    if (!cmd.member.roles.cache.some(role => role.name === 'Staff')) return


    if (cmd.msg.mentions.users.map(user => user).length === 0) return cmd.msg.channel.send({ embeds: [{ "description": "❌ You need to Mention the User/s to Unmute them!", "color": "#f53b3b" }] }).then(msg => msg.delete({ timeout: 5000 }))


    for (user of cmd.msg.mentions.users.map(user => user)) {
        unmuted.push(user.id)

        var toBeUnmuted = client.guilds.cache.get(cmd.guild.id).members.cache.get(user.id)

        toBeUnmuted.roles.remove(cmd.guild.roles.cache.find(role => role.name === 'Muted'))
    }


    if (unmuted.length > 1) {
        var userList = '>>> '
        for (user of unmuted) {
            userList += `<@${user}>\n`
        }

        return cmd.msg.channel.send({
            embeds: [{
                "description": `✅ The Following Users have been Unmuted:\n\n${userList}`,
                "color": "#48cf4b",
                "footer": {
                    "text": `Executed by ${cmd.member.user.tag}`
                }
            }]
        })
    } else {
        return cmd.msg.channel.send({
            embeds: [{
                "description": `✅ <@${unmuted[0]}> has been Unmuted!`,
                "color": "#48cf4b",
                "footer": {
                    "text": `Executed by ${cmd.member.user.tag}`
                }
            }]
        })
    }
}