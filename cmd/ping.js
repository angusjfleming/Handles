const now = require("performance-now");
exports.run = (bot, msg = []) => {
    var startTime = now();
    msg.channel.send("Let's see if this works").then(message => {
        var endTime = now();
        message.edit(`Ping took ${ (endTime - startTime).toFixed(3)}ms.`).catch(console.error);
    }).catch(console.error);
};

exports.help = {
    name: "ping",
    description: "*original description lmao*",
    usage: "ping"
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 4
};
