module.exports = ((client, message, id) => {
    let guildData = client.db.get("guilds").value()[message.guild.id]["users"]
    let guildDataArr = [];

    for (var n in guildData) {
        let pushData = {};
        pushData = guildData[n];
        pushData.id = n;

        guildDataArr.push(pushData)
    };

    return (
        guildDataArr
            .sort((a, b) => { b.level - a.level })
            .map(x => x.id)
            .indexOf(id) + 1
    ).toString();
});