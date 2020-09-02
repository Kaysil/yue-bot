module.exports = {
    name: "Help",
    description: "Lệnh dùng để nhận danh sách các lệnh có sẵn",
    commands: ["help", "commands"],
    usage: "[lệnh]",
    execute: (async (client, message, args) => {
        message.reply("c")
    })
};