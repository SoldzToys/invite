const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./botconfig.json');
const { prefix, token } = require('./botconfig.json');


client.on(`ready`, () => {
  console.log(`I am ready!`);
client.user.setActivity('Invite Simulation (?help)');
  
});

client.on('message', (message, args) => {
  
    if (message.content === `${prefix}hello`) {
    message.reply(`Hello, how are you?`);
      
    }
  
  if (message.content === `${prefix}say`) {
    message.channel.send(botmessage);
  
  }
  
  if (message.content === `${prefix}help`) {
    message.reply(`?invite, ?hello`)
    message.react("❓");
    
  }
  
  if(message.content === `${prefix}botshomeinvite`){
    message.reply("Invite: https://discord.gg/m7AGzBF "); 
  }
  
  if(message.content === `${prefix}invite`){
      if (message.channel.type == "dm") return;

    message.channel.createInvite().then(a =>
    message.author.send(a.toString()))
    message.channel.send(`✅ Invite Sucessfully sent to your DMs. `)
    
  }
  
  
});     
client.login(process.env.BOT_TOKEN);
