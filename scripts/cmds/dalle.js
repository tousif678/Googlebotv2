const fs = require("fs");
const axios = require("axios");

module.exports = {
  config: {
    name: "midjourney",
    aliases: ["midjr"],
    author: "kshitiz",
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "generate an image using midjourney         available prompts: 1. Cinematic,2. Photographic,3. Anime,4. Manga,5. Digital Art,6. Pixel art,7. Fantasy art,8. Neonpunk,9. 3D Model"
    },
    category: "𝗠𝗘𝗗𝗜𝗔",
    guide: {
      en: "[prompt | model]"
    }
  },
  onStart: async function ({ api, event, args }) {
    let path = __dirname + "/cache/image.png";
    let prompt;
    let style = 1;

    if (args.length === 0) {
      return api.sendMessage("Please provide a prompt and style number. eg: prompt | style", event.threadID, event.messageID);
    }

    if (args.length > 1) {
      const [promptArg, styleArg] = args.join(" ").split("|").map(item => item.trim());
      prompt = promptArg;
      style = styleArg;
    } else {
      prompt = args[0];
    }

    let tid = event.threadID;
    let mid = event.messageID;

    try {
      api.sendMessage("⏳ Generating... please wait it will take time.", tid, mid);

      let enctxt = encodeURIComponent(prompt);
      let encStyle = encodeURIComponent(style);
      let url = `https://ai-tools.replit.app/sdxl?prompt=${enctxt}&styles=${encStyle}`;

      let response = await axios.get(url, { responseType: "stream" });

      response.data.pipe(fs.createWriteStream(path));

      response.data.on("end", () => {
        api.sendMessage({ attachment: fs.createReadStream(path) }, tid, () => fs.unlinkSync(path), mid);
      });
    } catch (e) {
      return api.sendMessage(e.message, tid, mid);
    }
  }
};