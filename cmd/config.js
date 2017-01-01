exports.run = (bot, msg, params = []) => {

};

exports.help = {
    name: `config`,
    description: `Chooses between parameters entered. Multiple word choices must be contained with speech marks.`,
    usage: `config <key> (returns value)
config set <key> <value>
config del <key>`
};

exports.conf = {
    enabled: true,
    aliases: ['guildconfig', 'guidconf'],
    permLevel: 1
};
