var request = require('request');
var humanizeDuration = require('humanize-duration')
exports.run = (bot, msg, params = []) => {
    request('http://steamgaug.es/api/v2', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
        } else {
            msg.channel.send(`API seems to be down, try again soon.`)
            return;
        }

        var embed = {
            "title": "Steam Status",
            "url": "https://steamgaug.es/",
            "color": parseInt("ffffff", 16),
            "timestamp": new Date(),
            "footer": {
                "icon_url": bot.user.displayAvatarURL
            },
            "fields": [{
                    "name": "Steam",
                    "value": `Steam: ${(info.ISteamClient.online == 1) ? "**Online**" : "Offline"}
Steam Community: ${(info.SteamCommunity.online == 1) ? "**Online**" : "Offline"} (${info.SteamCommunity.time}ms)
Steam Store: ${(info.SteamStore.online == 1) ? "**Online**" : "Offline"} (${info.SteamStore.time}ms)
Steam User API: ${(info.ISteamUser.online == 1) ? "**Online**" : "Offline"} (${info.ISteamUser.time}ms)`
                },
                {
                    "name": "Dota 2",
                    "value": `API: ${(info.IEconItems[570].online == 1) ? "**Online**" : "Offline"} (${info.IEconItems[570].time}ms)
Game Coordinator: ${(info.ISteamGameCoordinator[570].online == 1) ? "**Online**" : "Offline"}
Players Searching: ${info.ISteamGameCoordinator[570].stats.players_searching}`
                },
                {
                    "name": "CS:GO",
                    "value": `API: ${(info.IEconItems[730].online == 1) ? "**Online**" : "Offline"} (${info.IEconItems[730].time}ms)
Game Coordinator: ${(info.ISteamGameCoordinator[730].online == 1) ? "**Online**" : "Offline"}
Players Searching: ${info.ISteamGameCoordinator[730].stats.players_searching}, with an average wait time of ${humanizeDuration(info.ISteamGameCoordinator[730].stats.average_wait)}.`
                }
            ]
        }
        /*
        embed.fields.forEach(function(element) {
            element.value = element.value.replace(/: 1/g, ": ****Online**** ");
            element.value = element.value.replace(/: 2/g, ": Offline ");
        });*/
        msg.channel.send("", {
            embed
        }).catch(err => msg.reply(err));
    })
};

exports.help = {
    name: "steam",
    description: "Returns status of steam.",
    usage: "steam"
};

exports.conf = {
    enabled: true,
    aliases: ['steamapi', 'steamstatus', 'steamstats'],
    permLevel: 1
};