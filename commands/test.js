exports.run = async (client, message, args, tools) => {
  
  if (!args[1]) return message.reply(".rename @someone nickaname");
  var member = args[0];
  
  member = message.mentions.users.first();
  let nickname = args.slice(1).join(" ");
  
  var members = message.guild.members.array();
  if (member == "everyone") {
    for (var i = 0; i < members.length; i++) {
      console.log(members[i]);
      if (members[i].bot == true) continue;
      await members[i].setNickname(nickname);
    }
    return;
  }
  if(!member) member = message.mentions.users.first();
  if(!member) member = message.mentions.users.first();
};
};
