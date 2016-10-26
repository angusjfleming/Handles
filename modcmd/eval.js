exports.run = (bot, msg, params = []) => {
  if (msg.author.id != "83697112432246784") return;
  evalstring = params.join("");
    try{
      msg.channel.sendMessage('**EVALUATING CODE:** ```js\n' + evalstring + '```\n**OUTPUT:** ```js\n' + eval(evalstring) + '```')
    } catch(err){
      msg.channel.sendMessage('**EVALUATING CODE:** ```js\n' + evalstring + '```\n**RESULTED IN ERROR:** ```js\n' + err + '```')
    }
};

exports.help = {
  name : "eval",
  description: "Evaluates js code",
  usage: "eval <code>"
};