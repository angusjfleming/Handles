var beautify = require('js-beautify').js_beautify

function reduceIndentation(string) {
    let whitespace = string.match(/^(\s+)/);

    if (!whitespace)
        return string;

    whitespace = whitespace[0].replace('\n', '');

    let lines = string.split('\n');
    let reformattedLines = [];

    lines.forEach((line) => {
        reformattedLines.push(line.replace(whitespace, ''));
    });

    return reformattedLines.join('\n');
}

exports.run = (bot, msg, params = []) => {
        let messages = msg.channel.messages.array().reverse().filter(msg => msg.author.id !== msg.client.user.id);
        let code;

        let codeRegex = /```(?:js|json|javascript)?\n?((?:\n|.)+?)\n?```/ig;

        for (let m = 0; m < messages.length; m++) {
            let msg = messages[m];
            let groups = codeRegex.exec(msg.content);

            if (groups && groups[1] && groups[1].length) {
                code = groups[1];
                break;
            }
        }

        if (!code) {
            return msg.channel.sendMessage(`:x: No JavaScript code blocks found.`);
        }

        let beautifiedCode = beautify(code, {
            indent_size: 2,
            brace_style: 'none'
        });
        beautifiedCode = reduceIndentation(beautifiedCode);

        msg.channel.sendMessage(`${ '```js'}\n${beautifiedCode}\n${ '```'}`);
};

exports.help = {
    name: `beautify`,
    description: `Cleans javascript code. Makes it look all lovely like`,
    usage: `beautify`
};

exports.conf = {
    enabled: true,
    aliases: ['cleanjs'],
    permLevel: 1
};
