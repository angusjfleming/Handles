module.exports = (bot, Discord, fs) => {
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
    if (err)
        console.error(err);
    console.log(`Loading a total of ${files.length} commands.`);
    files.forEach(f => {
        console.log(` Loading Command: ${props.help.name}.`);
        bot.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });
    });
});
};
