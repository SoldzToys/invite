const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./botconfig.json');
const { prefix, token } = require('./botconfig.json');
const moment = require('moment');
require('moment-duration-format');

client.on(`ready`, () => {
  console.log(`I am ready!`);
client.user.setActivity('Invite Simulation (>help)');
  
});

client.on('message', async (message, member) => {

    if (message.content.startsWith(`${prefix}help`)) {
	let server = message.guild.name;
	let helpembed = new Discord.RichEmbed()
	.setTitle(`☑ Help Bar`)
	.setDescription('Below are the commands for this bot, enjoy and use them respectfully.')
	.setColor("#7289da")
	.addField('📨 `>invite`', "This command informs the bot to send you an invite to the current server you are in.")
	//.addField('📡 `>anyinvite`', "This command informs the bot to send you an invite of any guild/server InviteBot is in. (**IMPORTANT NOTE:** InviteBot must be in the you are getting the ID from or it won't work. Just like you can't make an invite without being in the server, neither can InviteBot).")
	.addField('🗣 `>hello`', "This simply makes the bot reply to you with a response.")
	.addField('🤖 `>botinfo`', "This command gives you infomation on the bot and an invite if you want to add it to your server as well.")
	.addField('🔌 `>serverinfo`', `This command gives you infomation on ${server}.`)
	.addField('👩 `>userinfo`', "This command gives you information on yourself and other users roles, status, tag, etc.") 
	.setTimestamp();
	  message.channel.send(helpembed);
    message.react("✅");
  }

      if (message.content.startsWith(`${prefix}hello`)) {
    	let helloembed = new Discord.RichEmbed()
	.setTitle("Hello!")
	.setDescription(`Hello! How are you?`)
	.setColor("#7289da")
    message.channel.send(helloembed);
      
  }
	
			if (message.content.startsWith(`${prefix}userinfo`)) {

            let player = message.mentions.members.first() || message.member
            let iicon = player.user.displayAvatarURL;
            let roles = player.roles.map(role => role).join(" ");
	    let user = player.user
        if(!user) return message.channel.send("You haven't selected/mentioned a user whose info you want to see.");
            let userEmbed = new Discord.RichEmbed()
            .setAuthor(`${user.username}'s Info`, user.displayAvatarURL)
            .setThumbnail(user.displayAvatarURL)
            .setColor("#7289da")
            .addField('User ID', user.id, true)
            .addField('Current Tag', user.tag, true)
            .addField('Server Nickname', `${player.displayName}`, true) 
            .addField('Highest Member Role', `${player.highestRole.name}`, true)
            .addField('Roles', `${roles}`)
            .addField('Game/Playing', `${(user.presence.game && user.presence.game && user.presence.game.name) || 'None'}`, true)
            .addField('Status', user.presence.status, true)
            .addField('Bot', user.bot, true)
            .addField('Joined At:', `${player.joinedAt}`)
            .addField('Account Created On:', `${player.user.createdAt}`)
            .setThumbnail(iicon)
            .setTimestamp();
	return message.channel.send(userEmbed);
	}
	
   if (message.content.startsWith(`${prefix}botinfo`)) {

    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setDescription("Info on **InviteBot**:")
    .setColor("#7289da")
    .setThumbnail(bicon) 
    .addField("Bot Name", client.user.username, true)
    .addField("Bot Tag", client.user.tag, true)
    .addField("Bot ID", client.user.id, true)
    .addField("Bot Invite", "https://bit.ly/2OXoxan", true)
    .addField("Bot Uptime", moment.duration(client.uptime).format('d[d ]h[h ]m[m ]s[s]'), true)
    .addField("Bot's Home Server", "https://discord.gg/m7AGzBF", true)
    .addField("Guilds", client.guilds.size, true)
    .addField("Users", client.users.size, true)
    .addField("Date Of Creation", client.user.createdAt.toLocaleDateString(), true)
    .setFooter("Created By @Dawn.Bots.INC", client.user.displayAvatarURL) 
    .setTimestamp(); 
    return message.channel.send(botembed);
  }
  
    if (message.content.startsWith(`${prefix}invite`)) {
      if (message.channel.type == "dm") return;
	 if (message.author.user) return;
   try{
    await message.channel.createInvite().then(a => 
    message.author.send(a.toString()))
    message.channel.send(`📩 Invite Successfully sent to your DMs. `).then(message => message.delete(10000)); 
    message.delete();
   }catch(e){
    message.channel.createInvite().then(a => 
    message.channel.send(a.toString())).then(message => message.delete(30000)); 
    message.reply(`📨 Invite sent to the current channel you are in, this is due to your DMs being locked. It will delete in 30 seconds.`).then(message => message.delete(30000))
    message.delete(); 
  }
}
	

if (message.content.startsWith(`${prefix}anyinvite`)) {
 let args = message.content.slice(1).split(" ");
    if (message.channel.type == "dm") return;
	
    let sv = client.guilds.get(args[1])
    if (!sv) return message.channel.send(`❌ Enter a valid guild id!`)
    sv.channels.random().createInvite({maxAge: 0}).then(a => 
    message.author.send(a.toString()))
    message.channel.send(`📩 Guild Invite Successfully sent to your DMs. `)

}
	
if (message.content.startsWith(`${prefix}serverinfo`)) {		
    let sicon = message.guild.iconURL;
    let server = message.guild.name;
    let serverembed = new Discord.RichEmbed()
    .setTitle("Server Information")
    .setDescription(`Information on ${server}:`)
    .setColor("#7289da")
    .addField('Guild ID', message.guild.id, true)
    .addField('Guild Name', message.guild.name, true)
    .addField('Guild Channel Total', message.guild.channels.size, true)
    .addField('Guild Member Total', message.guild.memberCount, true)
    .addField('Guild Role Total', message.guild.roles.size, true)
    .addField('Guild Region', message.guild.region, true)
    .addField('Date Of Server Creation', message.guild.createdAt.toLocaleDateString(), true)
    .addField('Guild Owner', message.guild.owner, true)
    .setThumbnail(sicon) 
    .setFooter(`${server}`, sicon)
    .setTimestamp();
    message.channel.send(serverembed);
}
});
	
client.on('guildCreate', guild => {
  let channel = client.channels.get("501204268611797020");

  const joinembed = new Discord.RichEmbed()
      .setColor("#7289da")
      .setAuthor(`Joined ${guild.name}`)
      .setThumbnail(guild.iconURL)
      .addField("Guild Owner", guild.owner.user.tag, true)
      .addField("Guild ID", guild.id, true)
      .addField("User Count", guild.memberCount, true)
      .addField("Channel Count", guild.channels.size, true)
  return channel.send(joinembed);
});

client.on("guildUpdate", function (oldGuild, newGuild) {
         let channel = client.channels.get("499832353544470539");
	 let gicon = newGuild.iconURL;
        const eeembed = new Discord.RichEmbed()
            .setColor("#7289da")
            .setThumbnail(gicon)
            .setAuthor(`A Guild Has been Updated`, gicon)
            .addField(`Old Guild Name:`, `${oldGuild}`)
            .addField(`New Guild Name:`, `${newGuild}`)
        return channel.send(eeembed);
}); 

client.on('guildDelete', guild => {
  let channel = client.channels.get("501204268611797020");

  const leaveembed = new Discord.RichEmbed()
      .setColor("#7289da")
      .setAuthor(`Left ${guild.name}`)
      .setThumbnail(guild.iconURL)
      .addField("Guild Owner", guild.owner.user.tag, true)
      .addField("Guild ID", guild.id, true)
      .addField("User Count", guild.memberCount, true)
      .addField("Channel Count", guild.channels.size, true)
  return channel.send(leaveembed);
});       
client.login(process.env.BOT_TOKEN);
