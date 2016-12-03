exports.run = (bot, msg, params = []) => {
 var num1 = params[0]
 var num2 = params[1]
  var choice = Math.floor(Math.random() * num2);
  if (choice < num1){choice = num1}
  msg.channel.sendMessage(`Between ${num1} and ${num2}, I chose: \`${choice}\``)
};

exports.help = {
    name: `numbetween`,
    description: `Finds a number between x and y`,
    usage: `numbetween <num1> <num2>`
};

exports.conf = {
    enabled: true,
    aliases: ['nb'],
    permLevel: 1
};
