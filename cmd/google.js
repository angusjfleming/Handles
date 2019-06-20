var cheerio = require("cheerio");
const request = require('request');
var rgx2 = /\&(.*)/;
var options = {
    url: 'http://www.google.com/',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16'
    }
};

exports.run = (bot, msg, params = []) => {
    var results = []
    var searchTerm = params.join(' ');

    msg.channel.send("Searching...").then(msg => {
        request(options, function() {
            request(`https://www.google.co.uk/search?q=${searchTerm}`, function(error, response, body) {
                var $ = cheerio.load(body);
                $(".jfp3ef").each(function() {
                    if (this.children[0].attribs.href) {
                        var link = this.children[0].attribs.href;
                        link = link.slice(7)
                        link = link.replace(rgx2, "");
                        if (!link.includes("gstatic")) results.push(link);
                    } else {}

                });
                console.log(results)
                if (results[0] == undefined) {
                    response = randomElement(responses.googlenotfound).replace("<<token>>", `${searchTerm}`)
                    return msg.edit(response);
                } else {
                    response = randomElement(responses.googlefound).replace("<<token>>", `${results[0]}`)
                    return msg.edit(response);
                }
            });

        });
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
