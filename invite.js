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
	.setDescription("Below are the commands for this bot, enjoy and use them respectfully.")
	.setColor("#7289da")
	.addField('📧 `?invite`')
	.addField(`**This command informs the bot to send you an invite to the current server you are in.**`)
	.addField('🗣 `?hello`')
	.addField(`**This simply makes the bot reply to you with a response.**`)
	.addField('🤖 `?botinfo`')
	.addField(`**This command gives you infomation on the bot and an invite if you want to add it to your server as well.**`) 
	.setTimestamp();
	  message.channel.send(helpembed);
    message.react("✅");
  }
  
    if (message.content === `${prefix}hello`) {
    	let helloembed = new Discord.RichEmbed()
	.setTitle("Hello!")
	.setDescription(`Hello! How are you?`)
	.setColor("#7289da")
    message.channel.send(helloembed);
      
  }
  if(message.content === `${prefix}botinfo`){

    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setDescription("Info on **InviteBot**:")
    .setColor("#7289da")
    .setThumbnail(bicon)
    .addField("Bot Name", client.user.username, true)
    .addField("Bot Tag", client.user.tag, true)
    .addField("Bot Invite", "https://bit.ly/2OXoxan", true)
    .addField("Bot's Home Server", "https://discord.gg/m7AGzBF", true)
    .addField("Guilds", client.guilds.size, true)
    .addField("Users", client.users.size, true)
    .addField("Date Of Creation", client.user.createdAt.toLocaleString())
    .setTimestamp();
    return message.channel.send(botembed);
  }
  
  if(message.content === `${prefix}invite`){
      if (message.channel.type == "dm") return;

    message.channel.createInvite().then(a =>
    message.author.send(a.toString()))
    message.channel.send(`✅ Invite Sucessfully sent to your DMs. `)
    
  }
  
  
});     
client.login(process.env.BOT_TOKEN);
