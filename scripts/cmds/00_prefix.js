module.exports = {
 config: {
	 name: "prefix",
	 version: "1.0",
	 author: "Tokodori_Frtiz",//remodified by yukinori ʚĭɞ 
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "auto",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "prefix") {
 return message.reply({
 body: `
Yo, my prefix is [ 𓆩 / 𓆪 ]\n
━━━━━━━━━━━━━━━━━━━━━━━━━
Tousif
━━━━━━━━━━━━━━━━━━━━━━━━━
𝗦𝗢𝗠𝗘 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗧𝗛𝗔𝗧 𝗠𝗔𝗬 𝗛𝗘𝗟𝗣 𝗬𝗢𝗨:
➥ /help -> see commands
➥ /callad [message] -> report any problem encountered
➥ /help [command] -> information and usage of command\n\nHave fun using it enjoy!❤️\nBot Developer: https://www.facebook.com/Nomol.Rahman.Tousif`,
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/za2uvZQ.gif")
 });
 }
 }
}