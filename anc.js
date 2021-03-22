const Discord = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const client = new Discord.Client();
const token = process.env.TOKEN;



module.exports = {
    execute(anc) {
        const embed = new Discord.MessageEmbed()
					.setTitle("Webhook send")
					.setColor("#0099ff");

        client.login(token);
        client.once("ready", () => {
            console.log("Connected!");
        })
        client.once("message", async (msg) => {
            console.log(msg.guild.id);
            try {
                const webhooks = await msg.guild.fetchWebhooks();
                const webhook = webhooks.first();
                if (!webhook) {
                    msg.channel.send(
                        "Create a webhook the channels you want to send annoucements first! Refer help command"
                    );
                    return;
                }
                webhooks.map(async (webhook) => {
                    await webhook.send(`${anc}` , {
                    username: `SWC-ANNOUNCEMENT`,
                    avatarURL: "https://i.imgur.com/wSTFkRM.png",
                    embeds: [embed],
                    });
                })
               
            } catch (error) {
                console.error("Error trying to send: ", error);
            }            
        });

    }
};
