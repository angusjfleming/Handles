exports.run = (bot, msg, params = []) => {
    	messagecount = parseInt(params[0]) ? parseInt(params[0]) : 1;
    	msg.channel.fetchMessages({limit: 100})
    	.then( messages => {
    		msg_array = messages.array();
    		msg_array.length = messagecount + 1;
    		msg_array.map(m => m.delete().catch(console.error));
    	}).catch(console.error);
};

exports.help = {
  name : "delete",
  description: "Deletes message(s)",
  usage: "delete <# of messages>"
};