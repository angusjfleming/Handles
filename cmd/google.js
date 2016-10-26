var GoogleSearch = require('google-search');

var googleSearch = new GoogleSearch({
  key: 'AIzaSyB9UAxIaSXK-cOUvm8HRkHStf_GEukb-p8',
  cx: '011142711664808476551:kizdemxgas8'
});

exports.run = (bot, msg, params = []) => {
		googleSearch.build({
			q: params.join(""),
			num: 1, // Number of search results to return between 1 and 10, inclusive
		}, function(error, response) {
			msg.channel.sendMessage(response.items[0].link)
		});
};

exports.help = {
  name : "google",
  description: "Searches google",
  usage: "google <search terms>"
};