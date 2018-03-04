exports.run = (bot, msg, params = []) => {
msg.channel.send("🎱 "+ randomElement(responses.eightball) +" 🎱")

};

exports.help = {
    name: "8ball",
    description: "balls",
    usage: "8ball"
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 1
};