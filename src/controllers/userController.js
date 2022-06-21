let axios = require("axios");

//.....................................Get all memes data................................//
let getMemes = async function (req, res) {
  try {
    let options = {
      method: "get",
      url: "https://api.imgflip.com/get_memes",
    };
    let result = await axios(options);
    console.log(result);
    let data = result.data;
    res.status(200).send({ msg: data, status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};


//...................................Modified meme by using of that id.........................//
let getMemeById = async function (req, res) {
  try {
    let content = req.body;
    let {memeId,text0,text1,username,password} = req.query;
    let options = {
      method: "post",
      url: `https://api.imgflip.com/caption_image?template_id=${memeId}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`,
      data: content,
    };
    let result = await axios(options);
    let data = result.data;
    console.log(data);
    res.status(200).send({ msg: data, status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

module.exports.getMemes = getMemes;
module.exports.getMemeById = getMemeById;