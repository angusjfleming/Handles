module.exports = (bot, fs) => {
  fs.readdir("./reminders/", (err, files) => {
    var currentDate = new Date();
    if (err)
      console.error(err);
    files.forEach(f => {
      let reminder = require(`../reminders/${f}`);
      if (new Date(reminder.time) < new Date(currentDate)) {
        try {
        var fetchchannel = bot.guilds.find('id', reminder.guildid).channels.find('id', reminder.channelid);
        } catch (err) {return fs.unlink(`./reminders/${f}`, function(err) {})}
        fetchchannel.send(`<@${reminder.userid}> you wanted me to remind you of: \`${reminder.message}\``)
        fs.unlink(`./reminders/${f}`, function(err) {})
      }
    });
  });
};