module.exports = (bot, fs) => {
bot.notes = JSON.parse(fs.readFileSync('localstorage/notes.json', 'utf8'));
bot.guildconfs = JSON.parse(fs.readFileSync('localstorage/guildconfs.json', 'utf8'));
};
