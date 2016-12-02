const scrapeMdn = require("scrape-mdn");
exports.run = (bot, msg, params = []) => {
  searchTerm = params.join(' ');
  scrapeMdn.search(searchTerm).then((results) => {
var {url, title, description} = results[0];
console.log(url);
});
};

exports.help = {
    name: "mdn",
    description: "Seaches Mozzila developer network for whatever you want.",
    usage: "mdn <searchterm>"
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 2
};
