module.exports = (bot, fs) => {
  fs.readdir("./reminders/", (err, files) => {
    var currentDate = new Date();
    if (err)
      console.error(err);
    files.forEach(f => {
      let reminder = require(`../reminders/${f}`);
      if (new Date(reminder.time) < new Date(currentDate)) {
        var fetchchannel = bot.guilds.find('id', reminder.guildid).channels.find('id', reminder.channelid);
        if (reminder.message) {
          fetchchannel.send(`<@${reminder.userid}>, reminding you of \`${reminder.message}\` from ${reminder.datesent}.`).then(m => {
            setTimeout(m.delete.bind(m), 120000)
          })
        } else {
          fetchchannel.send(`<@${reminder.userid}>, reminding you from ${reminder.datesent}.`).then(m => {
            setTimeout(m.delete.bind(m), 120000)
          })
        }
        fs.unlink(`./reminders/${f}`, function(err) {})
      }
    });
  });
};