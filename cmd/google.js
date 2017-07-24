var scraper = require('google-search-scraper');

exports.run = (bot, msg, params = []) => {
    var first = true
    searchTerm = params.join(' ');

    var options = {
        query: searchTerm,
        limit: "1"
    };
    msg.channel.send("Searching...").then(msg => {
        setTimeout(function() {
            if (first) {
                response = responses.googlenotfound.randomElement().replace("<<token>>", `${searchTerm}`)
                return msg.edit(response);
            }
        }, 5000);

        scraper.search(options, function(err, url) {
            if (err) throw err;
            if (first) {
                first = false
                response = responses.googlefound.randomElement().replace("<<token>>", `${url}`)
                return msg.edit(response);
            }
        })
    });
};

exports.help = {
    name: `google`,
    description: `Searches google`,
    usage: `google <search terms>`
};

exports.conf = {
    enabled: true,
    aliases: ['search'],
    permLevel: 1
};