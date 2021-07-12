module.exports = async function (client) {

    //? Fetch Server Details
    var guild = await client.guilds.fetch('863749893113905242')
    var channel = guild.channels.cache.get('863769639426195478')

    //? Update Getting Started Embed
    var gettingStartedEmbed = {
        title: "Ready to Join the Unit?",
        description: "Click the ✅ below to Join the Unit!",
        color: "#ffffff"
    }

    var gettingStartedMsg = await channel.messages.fetch('864028952627904534')
    await gettingStartedMsg.edit({embed: gettingStartedEmbed})
    gettingStartedMsg.react('✅')


    //? Reaction Add User to Recruitment
    client.on('messageReactionAdd', async (reaction, user) => {
        if (user.id === client.user.id) return
        reaction.users.remove(user.id)
        if (reaction.message.channel.id !== '863769639426195478') return
        if (reaction.emoji.name !== '✅') return

        var member = await guild.members.fetch(user.id)
        member.roles.add(guild.roles.cache.find(r => r.name === "Awaiting Recruitment"))
    })


}