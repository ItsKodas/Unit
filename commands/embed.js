module.exports = function (client, cmd) {

    if (!cmd.member.roles.cache.some(role => role.name === 'Administrator')) return
    cmd.msg.delete()

    cmd.msg.channel.send({ embed: {"description": "Base Embed"} })

}