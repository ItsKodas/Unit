const Gamedig = require('gamedig')

module.exports = async (client) => {

    function Update() {
        Gamedig.query({
            type: 'arma3',
            host: 'horizons.gg',
            port: 2302
        }).then((state) => {
            client.user.setStatus('online')
            client.user.setActivity({ name: `${state.players.length} / ${state.maxplayers} Players`, type: 'WATCHING' })
        }).catch((error) => {
            client.user.setStatus('dnd')
            client.user.setActivity({ name: `Server Offline`, type: 'WATCHING' })
        })
    }

    setInterval(Update, 1000 * 30), Update()
}