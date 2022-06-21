let axios = require("axios");

// ........................Get Weather data of London by using of Axios and weather url............................//
let getWeatherDataOfLondon = async function (req, res) {
    try {
      let country = req.query.q;
      let apiKey = req.query.appid;
      let options = {
        method: "get",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}`,
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



  //.........................Get temperature of London...........................//
  let getTemperature = async function (req, res) {
    try {
      let country = req.query.q;
      let apiKey = req.query.appid;
      let options = {
        method: "get",
        url: `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}`,
      };
      let result = await axios(options);
      console.log(result);
      let data = result.data.main.temp;
      res.status(200).send({ country: country, temperature: data });
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: err.message });
    }
  };


 //....................Get Weather of different cities with assending order temperature..........................//
  let getWeatherDataByCity = async function (req, res) {
    try {
      const apiKey = req.query.appid;
      let cities = req.query.q;
  
      cities = cities.split(",");
  
      let response = [];
      for (let i = 0; i < cities.length; i++) {
          const city = cities[i].trim()
        const options = {
          method: "get",
          url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
        };
        let result = await axios(options);
        response.push({"city":city,"temp":result.data.main.temp})
      }
      const sorting = response.sort(function(a,b){return(a.temp - b.temp)})
      res.status(200).send({sorting});
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: err.message });
    }
  };


module.exports.getWeatherDataOfLondon = getWeatherDataOfLondon;
module.exports.getTemperature = getTemperature;
module.exports.getWeatherDataByCity = getWeatherDataByCity;