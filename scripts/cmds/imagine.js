const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const KievRPSSecAuth = "FABqBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACIOV+wTnbLYfKAQ6pnrfaaymUfFSPx5LxQHOEyGmyzJjbawRsaJdAwQVcZuiRD8qhgHgvDQmSNhFDFpobSW0Zs3mojB/r6TwvxEEO6rCSCiMxwepXel94ze0Gp9j2n3SMLJaFrdzbfhFdi8zDDVzZ4pUukyD6XfJlA8KPzq+toMGiQ789O+8vXmMBVMMjn129cuGh3E/FfmUE2Zoev5xbKjbL7vYLSzP6+uHdykSJamJ3p+EfEAhy8gzSA2+3wtO0k+3ydeg+xyRzjZ3BiB8XvgCLYqKywcjC5gPkRAgkT/rK7k+QarLTE8tJLnzu91wvDO4TwyKWTrgkB594NxOMjX0AXtHB+nuXHBoOhWd02qfW4zLeh0/uNpZvee7NHmmfgUaWXIrdjJWA12gu/ExOEO+IZJEQJD8cfBhmGH1WHwj+cz9Lfyyz1A8F5RE+5+Fw7Y5jCu9zRpKwCdTbyd+Job2qwbGOxFAVl/h/3T6d7OKZhAvVnskZs9ztzwkEGUHyVlOGzD1GGO4HN9EHTo7QsJtXClvcqy/uJphIuhf+i3wlpWGrMX/XJ9qK+E6DnL5HOjGj2TUXy8QAzhRalp/6siOUSd6ebrRKW+2LM9PTm6McMwD0tIVUho2GXM9rH6iq4eFL0q+2k6Zv1SSOzF0JT1BDzCXKLNKC5INo5YcN/RvvPeY6dxSXCQp1yY5SZt0QzZLbyRrxSAJzOsbETZP3aJHZSAS2i9MvbnjbgKRXzGJ0khqtLH9rcCXN1igH1L4r4bzN8BVhl18iRJg10Aw97VktAPuY04o6qegg5oJV3FsNERQ3k7OauIwgc9wxK19uPzo3f43y9MTJJ3BWALotCdvEq8t7+7iBOIw87ZikiSTfqmfaWeeyOcTULyictndldgsN5YoRZSgL0+nPyBUN0NKNDZpJcX6A7yKPoNHiLYLi97Gzobim20984Uylo3sTMdSY+9aFI8BAELW8YWpqlynkuUuoF4cFLAkXoM/K864LZWTSubjYc+ZDLlo6HIHKi3P3lAd1RO2HJK2tlmRRrlLhXJbe8CmiWypXMQsjRittNzjccybnlU9yhbRUq3W6F6XtBRHHDZuMxnfpbnpKHBWHnV5p0OmI563/b6iS4hIis3B25v0YC8tV7/sdZ4nvSI6fx3Q6cmsxXObjfJSX8P1O/guPLwtrbvuoDVbAZo5wp0xLex8oma/DUn9GdmBjvr7KUKJPhssyn6lBkp3zBcGiOtk8j6bQasVKG3xY+jfY7Gs1aX6NKb1AfE2+0JY4t43S9iv5ioua7/C8LMfPBlrSq3a+XzwB0U7rFOZ3pQJtC41VZcE+yxpsJukJ5H/NqvkR3PfkYIi7k93RScWj+aD+V1IwAf9vJLoqI/pEA99tF6vcMxBEe3NrehsbrCcKe5W+8Xc34WH2mQsXI1ed/tdURQAcZ2wyIXhdZB0sNrN0bP+QkxmLFE=";
const _U = "1gWTGAYyRE3ECw4mPLthxnnFG4gYHpxUwmMunUqaZM34lhfuGLn_dZjeNxCWBpRNoDp8xhijyioJtUdOLmVWm-EL45HSQwsfxbZdA36I2KL3wP39ilvCEW_s3iWUQ9u1nLydQijh2OR4ne55ShMrM1K8FlDLL1qg7riZpYboCElGNc4PmOWCszSrhzLtxWNOxdNWU0_kz2y4WD1T2u8vShA";
module.exports = {
  config: {
    name: "imagine",
    aliases: ["genai"],
    version: "1.0.2",
    author: "Samir Œ ",
    role: 0,
    countDown: 5,
    shortDescription: {
      en: "dalle"
    },
    longDescription: {
      en: ""
    },
    category: "dalle",
    guide: {
      en: "{prefix}dalle <search query> -<number of images>"
    }
  },

  onStart: async function ({ api, event, args }) {

const uid = event.senderID
    const permission = [`${uid}`];
    if (!permission.includes(event.senderID)) {
      api.sendMessage(
        "You don't have enough permission to use this command. Only admin can do it.",
        event.threadID,
        event.messageID
      );
      return;
    }

    const keySearch = args.join(" ");
    const indexOfHyphen = keySearch.indexOf('-');
    const keySearchs = indexOfHyphen !== -1 ? keySearch.substr(0, indexOfHyphen).trim() : keySearch.trim();
    const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 4;

    try {
      const res = await axios.get(`https://api-dalle-gen.onrender.com/dalle3?auth_cookie_U=${_U}&auth_cookie_KievRPSSecAuth=${KievRPSSecAuth}&prompt=${encodeURIComponent(keySearchs)}`);
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        api.sendMessage("No images found for the provided query.", event.threadID, event.messageID);
        return;
      }

      const imgData = [];
      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
        body: `Here's your generated image`
      }, event.threadID, event.messageID);

    } catch (error) {
      console.error(error);
      api.sendMessage("cookie of the command. Is expired", event.threadID, event.messageID);
    } finally {
      await fs.remove(path.join(__dirname, 'cache'));
    }
  }
};