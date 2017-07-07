var scraper = require('google-search-scraper');

exports.run = (bot, msg, params = []) => {
    var first = true
    searchTerm = params.join(' ');

    var options = {
        query: searchTerm,
        limit: "1"
    };
    msg.channel.send("Searching...").then(msg => {
        setTimeout(function(){ if(first) {return msg.edit("No result was found for query `" + searchTerm + "`");} }, 5000);

        scraper.search(options, function(err, url) {
            if (err) throw err;
            if (first) {
                first = false
                return msg.edit("First result found for query `" + searchTerm + "`: " + url);
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