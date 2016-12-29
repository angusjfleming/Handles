module.exports = (bot, fs) => {
    var notes = "notes";
    createjson(bot, notes, fs);
};

function createjson(bot, jsonname, fs) {
    if (fs.existsSync(`localstorage/${jsonname}.json`)) {
        bot.notes = JSON.parse(fs.readFileSync(`localstorage/${jsonname}.json`, 'utf8'));
    } else {
        fs.writeFile(`localstorage/${jsonname}.json`, JSON.stringify({}), (err) => {
            if (err) console.log(err);
        });
        setTimeout(function() {
            bot.notes = JSON.parse(fs.readFileSync(`localstorage/${jsonname}.json`, 'utf8'));
        }, 500);
    }
}
