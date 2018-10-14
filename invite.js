const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./botconfig.json');
const { prefix, token } = require('./botconfig.json');


client.on(`ready`, () => {
  console.log(`I am ready!`);
client.user.setActivity('Invite Simulation (?help)');
  
});

client.on('message', async (message, member) => {

  if (message.content === `${prefix}help`) {
	let helpembed = new Discord.RichEmbed()
	.setTitle("Help Bar") 	 
	.setDescription(`?invite, ?hello, ?botshomeserver`)
	.setColor("#7289da")
	.setTimestamp();
	  message.channel.send(helpembed);
    message.react("❓");
  }
  
    if (message.content === `${prefix}hello`) {
    	let helloembed = new Discord.RichEmbed()
	.setTitle("Hello!")
	.setDescription(`Hello! How are you?`)
	.setColor("#7289da")
	.setTimestamp();
    message.channel.send(helloembed);
      
  }
  
  if(message.content === `${prefix}botinvite`){
    	let homeembed = new Discord.RichEmbed()
	.setTitle("Invitation")
	.setDescription(`Bot's' Home Server: https://discord.gg/m7AGzBF`)
	.setColor("#7289da")
	.addField(`Want to invite me to your server?: https://bit.ly/2OXoxan`)
	.setTimestamp();
	  message.channel.send(homeembed); 
  }
  
  if(message.content === `${prefix}invite`){
      if (message.channel.type == "dm") return;

    message.channel.createInvite().then(a =>
    message.author.send(a.toString()))
    message.channel.send(`✅ Invite Sucessfully sent to your DMs. `)
    
  }
  
  
});     
client.login(process.env.BOT_TOKEN);
