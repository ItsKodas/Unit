module.exports = function (client, cmd) {

    if (!cmd.member.roles.cache.some(role => role.name === 'Staff')) return
    cmd.msg.delete()

    if (cmd.msg.mentions.users.map(user => user).length === 0) return cmd.msg.channel.send({ embed: { "description": "❌ You need to Mention the User to Add/Remove their NSFW Access!", "color": "#f53b3b" } }).then(msg => msg.delete({ timeout: 5000 }))

    var user = cmd.guild.members.cache.get(cmd.msg.mentions.users.first().id)

    if (user._roles.includes(cmd.guild.roles.cache.find(role => role.name === 'NSFW').id)) {
        user.roles.remove(cmd.guild.roles.cache.find(role => role.name === 'NSFW'))
        return cmd.msg.channel.send({
            embed: {
                "description": `✅ <@${user.id}>'s NSFW Access has been revoked!`,
                "color": "#48cf4b",
                "footer": {
                    "text": `Executed by ${cmd.member.user.tag}`
                }
            }
        })
    } else {
        user.roles.add(cmd.guild.roles.cache.find(role => role.name === 'NSFW'))
        return cmd.msg.channel.send({
            embed: {
                "description": `✅ <@${user.id}> has been granted NSFW Access!`,
                "color": "#48cf4b",
                "footer": {
                    "text": `Executed by ${cmd.member.user.tag}`
                }
            }
        })
    }
}