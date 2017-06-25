module.exports = (bot, fs) => {
  fs.readdir("./reminders/", (err, files) => {
    var currentDate = new Date();
    if (err)
      console.error(err);
    files.forEach(f => {
      let reminder = require(`../reminders/${f}`);
      if (new Date(reminder.time) < new Date(currentDate)) {
        if (reminder.message) {
          bot.users.find("id", reminder.authorid).send(`reminding you of \`${reminder.message}\`.`).then(m => {
            setTimeout(m.delete.bind(m), 30000)
          })
        } else {
          bot.users.find("id", reminder.authorid).send(`reminding you.`).then(m => {
            setTimeout(m.delete.bind(m), 30000)
          })
        }
        fs.unlink(`./reminders/${f}`, function(err) {})
      }
    });
  });
};