const Discord = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const { Client } = require("discord.js");
const client = new Client({ ws: { intents: ["GUILDS", "GUILD_MESSAGES"] } });
const token = process.env.TOKEN;

module.exports = {

    // resetBot() {
    //     client.destroy();
    //     console.log("Disconnected!");
    //     client.login(token);
    // },
	execute(anc) {
		client.login(token);
		//760027403933712384 - AltruisticHome's Server
		//700582407048396810 - SWC Server

		// const channels = swcGuild.channels;
        client.once("ready", () => {
					console.log("Connected!");
					const swcGuild = client.guilds.cache.get("700582407048396810");

					//=================== IN CASE OF MANY CHANNELS ======================
					/* const channels = swcGuild.channels.cache.filter((channel) => {
                return channel.type === "text";
            });
            // console.log(channels);
            channels.forEach((channel) =>
                channel.send({
                    embed: {
                        color: 3447003,
                        author: {
                            name: "SWC Announcements",
                            icon_url:
                                "https://cdn.discordapp.com/attachments/761194181083004928/822708112615276554/IMG-20210318-WA0024.jpg",
                        },
                        title: "SWC Announcement",
                        url: "https://www.facebook.com/swciitg/",
                        description: `This is an important announcement from team`,
                        fields: [
                            {
                                name: "Topic",
                                value: `${anc}`,
                            },
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url:
                                "https://cdn.discordapp.com/attachments/761194181083004928/822708112615276554/IMG-20210318-WA0024.jpg",
                            text: "© SWC IITG",
                        },
                    },
                })
            );
            */

					// test channel id: 823922009041535007
					// ==================   In case of Channel only ====================
					const ancChannel = swcGuild.channels.cache.get("761194181083004928");
					ancChannel.send({
						embed: {
							color: 3447003,
							author: {
								name: "SWC Announcements",
								icon_url:
									"https://cdn.discordapp.com/attachments/761194181083004928/822708112615276554/IMG-20210318-WA0024.jpg",
							},
							title: "SWC Announcement",
							url: "https://www.facebook.com/swciitg/",
							description: `This is an important announcement from team`,
							fields: [
								{
									name: "Topic",
									value: `${anc}`,
								},
							],
							timestamp: new Date(),
							footer: {
								icon_url:
									"https://cdn.discordapp.com/attachments/761194181083004928/822708112615276554/IMG-20210318-WA0024.jpg",
								text: "© SWC IITG",
							},
						},
					});

					// this.resetBot();
				});
	},
};
