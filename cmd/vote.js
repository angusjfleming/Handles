exports.run = (bot, msg) => {
  msg.channel.sendMessage(`${msg.author.username} created a vote on \`${params.join(" ")}\`. Type yes or no in the chat to vote!`)
  var yes = 0;
  var no = 0;
    const votecollector = msg.channel.createCollector({
        time: 30000
    });
    votecollector.on(`message`, m => {
        if (m.content === `no` && !msg.author.voted){
            yes++;
            msg.author.voted = true;
          }
        if (m.content === `yes` && !msg.author.voted){
            no++;
            msg.author.voted = true;
          }
    });
    votecollector.on(`end`, (collected, reason) => {
        if (yes > no){
          msg.channel.sendMessage(`Voting on \`${params.join(" ")}\` has ended. Yes won with ${yes} votes. No only had ${no} votes. :sad: `)
        }
        if (no > yes){
          msg.channel.sendMessage(`Voting on \`${params.join(" ")}\` has ended. No won with ${no} votes. In comparison, yes only had ${yes} votes. Pitiful. :joy: `)
        }
});
};
exports.help = {
    name: `vote`,
    description: `Intiates a vote.`,
    usage: `vote <issue/topic>`
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: 1
};
