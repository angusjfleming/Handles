module.exports = (guild, bot) => {
    guilddefault = guild.defaultChannel;
    guilddefault.sendMessage(`Hi, I'm ${bot.user.username}!
You've added me to your server, maybe you were tricked but if you added me to use me, here are some things you should know:

@${bot.user.username} help will give you a list of commands, by default only containing commands everyone can use.
The guild owner will be able to use admin commands with no role, but if you wish for others to be able to use these commands, give them a role named Admin.
This role doesn't need the Administrator position, it just allows users to use the bots admin commands.

Commands can be used by tagging the bot and then writing the command name and parameters, or you can use the prefix ${bot.prefix} followed by a command.
e.g. @${bot.user.username} help and -help would both perform the same function.

If you want to log admin command usage, create a channel named #mod_log, and commands will automatically log here.

If you have any issues/questions, please use the contact command (@${bot.user.username} contact)`)
};
