const Discord = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const { Client } = require("discord.js");
const client = new Client({ ws: { intents: ["GUILDS", "GUILD_MESSAGES"] } });
const token = process.env.TOKEN;

module.exports = {
	execute(anc, type) {
		client.login(token);

		//760027403933712384 - AltruisticHome's Server
		//700582407048396810 - SWC Server
		//Altruistic Home server's general channel - 760027403933712387;
		//SWC- channel - 761194181083004928
		//test channel id: 823922009041535007

		// const channels = swcGuild.channels;
		client.once("ready", () => {
			console.log("Connected!");
			const icon_url_swc =
				"https://cdn.discordapp.com/attachments/761194181083004928/822708112615276554/IMG-20210318-WA0024.jpg";
			const icon_url_test = "http://www.mandysam.com/img/random.jpg";
			const swcGuild = client.guilds.cache.get("760027403933712384");

			//In one channel alone
			if (type === "anc-channel-only") {
				// ==================   In case of Channel only ====================

				const ancChannel = swcGuild.channels.cache.get("760027403933712387");
				ancChannel.send({
					embed: {
						color: 3447003,
						author: {
							name: "SWC Announcements",
							icon_url: icon_url_test,
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
							icon_url: icon_url_test,
							text: "© SWC IITG",
						},
					},
				});
				return;
			}

			// In all channels
			else if (type === "all-text-channels") {
				const channels = swcGuild.channels.cache.filter((channel) => {
					return channel.type === "text";
				});
				// console.log(channels);
				channels.forEach((channel) =>
					channel.send({
						embed: {
							color: 3447003,
							author: {
								name: "SWC Announcements",
								icon_url: icon_url_test,
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
								icon_url: icon_url_test,
								text: "© SWC IITG",
							},
						},
					})
				);
				return;
			} else {
				return alert("select valid options");
			}
			
		});
	},
};
