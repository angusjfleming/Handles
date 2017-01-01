module.exports = (bot, Discord, fs) => {
    if (bot.commands && bot.aliases){
      bot.commands.deleteAll()
      bot.aliases.deleteAll()
      return;
    }
    bot.commands = new Discord.Collection();
    bot.aliases = new Discord.Collection();
    fs.readdir("./cmd/", (err, files) => {
        if (err)
            console.error(err);
        console.log(`Loading a total of ${files.length} commands.`);
        files.forEach(f => {
            let props = require(`../cmd/${f}`);
            console.log(` Loading Command: ${props.help.name}.`);
            bot.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                bot.aliases.set(alias, props.help.name);
            });
        });
    });
};
