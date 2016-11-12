var request = require('request');

exports.run = (bot, msg, params = []) => {
    searchTerm = params.join(' ');
    msg.channel.sendMessage("Searching...").then(msg => {
        request('https://www.google.com/search?q=' + encodeURI(searchTerm), function(err, res, body) {
            if (err) callback(err);
            else {
                if (body.indexOf('/url?q=') > -1) {
                    body = body.slice(body.indexOf('/url?q=') + 7);
                    body = body.slice(0, body.indexOf('&'));
                    body = decodeURIComponent(body);
                    msg.edit("First result found for query `" + searchTerm + "`: " + body);
                } else msg.edit("There is no result found for query `" + searchTerm + "`");
            }
        });
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
  permLevel: 0
};
