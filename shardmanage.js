const Discord = require('discord.js');

const manager = new Discord.ShardingManager('bot.js');
manager.spawn(2);
manager.on('launch', shard => {
  console.log(`Launched shard ${shard.id}`);
});