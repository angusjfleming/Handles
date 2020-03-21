var googleIt = require('google-it')

exports.run = (bot, msg, params = []) => {
    var results = []
    var searchTerm = params.join(' ');

    msg.channel.send("Searching...").then(msg => {
        googleIt({
            "no-display": true,
            'query': searchTerm
        }).then(results => {
            if (results[0] == undefined) {
                response = randomElement(responses.googlenotfound).replace("<<token>>", `${searchTerm}`)
                return msg.edit(response);
            } else {
                response = randomElement(responses.googlefound).replace("<<token>>", `${results[0].link}`)
                return msg.edit(response);
            }
        }).catch(e => {
            response = randomElement(responses.googlenotfound).replace("<<token>>", `${searchTerm}`)
            return msg.edit(response);
        })
    });
};

exports.help = {
    name: "google",
    description: "Searches google",
    usage: "google <search terms>"
};

exports.conf = {
    enabled: true,
    aliases: ["search"],
    permLevel: 1
};
