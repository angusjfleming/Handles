exports.run = (bot, msg, params = []) => {
    	messagecount = parseInt(params[0]) ? parseInt(params[0]) : 1;
    	msg.channel.fetchMessages({limit: 100})
    	.then( messages => {
    		msg_array = messages.array();
        if (messagecount + 1 > msg_array.length){
          msg.channel.bulkDelete(msg_array)
        } else {
          msg_array.length = messagecount + 1;
          msg.channel.bulkDelete(msg_array)
        }}).catch(console.error);
};

exports.help = {
  name : "delete",
  description: "Deletes message(s)",
  usage: "delete <# of messages>"
};

exports.conf = {
  enabled: true,
  aliases: ['del', 'purge'],
  permLevel: 2
};