// module.exports = ((level) => {
//     if (level < 10) {
//         return String("Đồng")
//     };
    
//     if (level >= 10 && level < 20) {
//         return String("Bạc")
//     }
    
//     if (level >= 20 && level < 30) {
//         return String("Vàng")
//     }
    
//     if (level >= 30 && level < 40) {
//         return String("Bạch kim")
//     }
    
//     if (level >= 40 && level < 50) {
//         return String("Kim cương")
//     }

    
//     if (level >= 50 && level < 60) {
//         return String("Cao thủ")
//     }
    
//     if (level >= 60) {
//         return String("Chí tôn")
//     }
// });

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
            .sort((a, b) => { a.level - b.level })
            .map(x => x.id)
            .indexOf(id) + 1
    ).toString();
});