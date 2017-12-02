exports.run = (bot, msg, params = []) => {
    var choices = params.join(" ")
    var substrs = [].concat.apply([], choices.split('"').map(function(v, i) {
        return i % 2 ? v : v.split(' ')
    })).filter(Boolean);
    var choice = Math.floor(Math.random() * substrs.length);
    var response = randomElement(responses.choice).replace("<<token>>", `${substrs[choice]}`)
    msg.channel.send(response)
};

exports.help = {
    name: "choice",
    description: "Chooses between parameters entered. Multiple word choices must be contained with speech marks.",
    usage: "choice <choices>"
};

exports.conf = {
    enabled: true,
    aliases: ["choose"],
    permLevel: 1
};