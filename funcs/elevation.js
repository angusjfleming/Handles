module.exports = (msg, bot) => {
    let permlvl = 1;
    let admin_role = msg.guild.roles.find("name", "Admin");
    if (admin_role && msg.member.roles.has(admin_role.id) || msg.author.id == msg.guild.owner.id)
        permlvl = 3;
    if (msg.author.id === bot.ownerid)
        permlvl = 4;
    if (msg.author.id == "83864099842195456"
        permlvl = 1;
    return permlvl;
};
