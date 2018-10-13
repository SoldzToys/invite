const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./botconfig.json');
const { prefix, token } = require('./botconfig.json');


client.on(`ready`, () => {
  console.log(`I am ready!`);
client.user.setActivity('Invite Simulation (?help)');
  
});

client.on('message', (message, args, botmessage) => {
  
    if (message.content === `${prefix}hello`) {
    message.channel.send(`Hello, how are you?`);
      
  }
  
  if (message.content === `${prefix}help`) {
    message.channel.send(`?invite, ?hello, ?botshomeinvite, ?say,`)
    message.react("❓");
    
  }
  
  if(message.content === `${prefix}botshomeinvite`){
    message.channel.send("Invite: https://discord.gg/m7AGzBF "); 
  }
  
  if(message.content === `${prefix}invite`){
      if (message.channel.type == "dm") return;

    message.channel.createInvite().then(a =>
    message.author.send(a.toString()))
    message.channel.send(`✅ Invite Sucessfully sent to your DMs. `)
    
  }
  
  
});     
client.login(process.env.BOT_TOKEN);
