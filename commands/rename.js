exports.run = async (client, message, args, tools) => {
  return;
  if (!args[1]) return message.reply(".rename @someone nickaname");
  var member = args[0];
  
  let nickname = args.slice(1).join(" ");
  
  var members = message.guild.members.array();
  if (member == "everyone") {
    for (var i = 0; i < members.length; i++) {
      var tempMember = message.guild.members.get(members[i].id)
      if (tempMember.bot == true || tempMember.highestRole.comparePositionTo(message.guild.members.get(client.user.id).highestRole) >= 0 ) continue;
      await tempMember.setNickname(nickname);
    }
    return message.reply("Membres renommés en " + nickname)
  }
  
  member = message.mentions.users.first();
  
  if(member) member = message.guild.members.get(member.id)
  if(!member) member = message.guild.members.get(args[0])
  if(!member) return message.reply("Membre introuvable")
  
  await member.setNickname(nickname)
  return message.reply("Membres renommés en " + nickname)
};