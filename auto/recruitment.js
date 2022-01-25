const { MessageActionRow, MessageButton } = require('discord.js')



module.exports = async (client) => {

    //? Fetch Server Details
    var guild = await client.guilds.fetch('863749893113905242')
    var startChannel = guild.channels.cache.get('863769639426195478')
    var recruitmentChannel = guild.channels.cache.get('863771266431057940')

    //? Update Getting Started Embed
    var gettingStartedEmbed = {
        title: "Ready to Join the Unit?",
        description: "Click the ✅ below to Join the Unit!",
        color: "#ffffff"
    }

    const buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('join')
                .setLabel('Join Unit')
                .setStyle('SUCCESS')
        )

    var gettingStartedMsg = await startChannel.messages.fetch('864028952627904534')
    await gettingStartedMsg.edit({ embeds: [gettingStartedEmbed], components: [buttons] })


    //? Reaction Add User to Recruitment
    client.on('interactionCreate', async interaction => {

        if (interaction.customId === 'join') {
            var member = await guild.members.fetch(interaction.user.id)
            if (member._roles.length > 0) return await interaction.reply({ content: 'Only new members can use this button!', ephemeral: true })

            member.roles.add(guild.roles.cache.find(r => r.name === "Awaiting Recruitment"))

            var options = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId(`accept-${member.id}`)
                        .setLabel('Accept')
                        .setStyle('SUCCESS'),

                    new MessageButton()
                        .setCustomId(`deny-${member.id}`)
                        .setLabel('Deny')
                        .setStyle('DANGER'),
                )

            recruitmentChannel.send({
                content: `<@&863770574630551552> <@${member.id}>`,
                embeds: [{
                    "description": `<@${member.id}> has applied to join the unit!\n\nAfter reviewing ${member.user.username}, you can accept or deny them by clicking the buttons below!`,
                    "color": "#ff7e1c",
                    "thumbnail": {
                        "url": member.user.avatarURL({ dynamic: true, size: 128 })
                    }
                }],
                components: [options]
            }).then(msg => msg.pin())

            await interaction.reply({ content: 'Please goto <#863771266431057940>', ephemeral: true })
        }



        if (!interaction.customId.includes('-')) return
        var args = interaction.customId.split('-')

        var executor = await guild.members.cache.get(interaction.user.id)
        if (!executor.roles.cache.some(role => role.name === 'Recruiters')) return await interaction.reply({ content: 'Only Recruiters can use this button!', ephemeral: true })

        if (args[0] === 'accept') {
            var member = await guild.members.fetch(args[1])
            member.roles.remove(guild.roles.cache.find(r => r.name === "Awaiting Recruitment"))
            member.roles.add(guild.roles.cache.find(r => r.name === "Member"))
            member.roles.add(guild.roles.cache.find(r => r.name === "Recruit"))

            interaction.reply({
                embeds: [{
                    "description": `✅ <@${member.id}> has been Approved!`,
                    "color": "#48cf4b",
                    "footer": {
                        "text": `Executed by ${interaction.user.tag}`
                    }
                }]
            })

            interaction.message.delete()
        }

        if (args[0] === 'deny') {
            var member = await guild.members.fetch(args[1])
            member.roles.remove(guild.roles.cache.find(r => r.name === "Awaiting Recruitment"))

            interaction.reply({
                embeds: [{
                    "description": `❌ <@${member.id}> has been Denied!`,
                    "color": "#ff421c",
                    "footer": {
                        "text": `Executed by ${interaction.user.tag}`
                    }
                }]
            })

            interaction.message.delete()

            member.kick()
        }

    })


} 