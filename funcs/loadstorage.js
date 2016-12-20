module.exports = (bot, fs) => {
  if (fs.existsSync('localstorage/notes.json')){
bot.notes = JSON.parse(fs.readFileSync('localstorage/notes.json', 'utf8'));
} else {
  fs.writeFile('localstorage/notes.json', JSON.stringify({}), (err) => {if (err) console.log(err);});
  setTimeout(function(){
  bot.notes = JSON.parse(fs.readFileSync('localstorage/notes.json', 'utf8'));
}, 500);
}
};
