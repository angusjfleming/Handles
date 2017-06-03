const safeJsonStringify = require('safe-json-stringify');
const fs = require('fs')
exports.run = (bot, msg, params = []) => {
    var changed = false
    msg.delete(10000)
    if (typeof bot.guildconfigs === undefined) {
        bot.guildconfigs = {}
        obj = {}
    } else {
        obj = bot.guildconfigs
    }
    var configdata = {}
    if (params[0] = "announcenewsusers"){
        if (params[1].toLowerCase() == "true") {
            changed = true
            configdata.announcenewusers = true
        }
        if (params[1].toLowerCase() == "false") {
            changed = true
            configdata.announcenewusers = false
        }
        if (changed) {
        obj[msg.guild.id] = configdata
        fs.writeFileSync(`./guildconfigs.json`, safeJsonStringify(obj))
        msg.channel.send(`Config updated: \n\`\`\`${JSON.stringify(bot.guildconfigs[msg.guild.id], null, ' ')}\`\`\``).then(m => {
            setTimeout(m.delete.bind(m), 10000)
        })
        } else {
            msg.channel.send("You did not enter a valid key value pair.").then(m => {
            setTimeout(m.delete.bind(m), 10000)
        })
        }
    }
    
};

exports.help = {
    name: `guildconfig`,
    description: `Chooses between parameters entered. Multiple word choices must be contained with speech marks.`,
    usage: `guildconfig <key> value`
};

exports.conf = {
    enabled: true,
    aliases: ['config'],
    permLevel: 3
};
