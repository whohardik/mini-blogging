const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const WeatherController = require("../controllers/weatherController")
const MemesController = require("../controllers/memesController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)

router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)

router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

router.get("/cowin/getDistrictsById", CowinController.getDistrictsById)

router.get("/weather/getWeatherData", WeatherController.getWeatherDataOfLondon)

router.get("/getTemperature",WeatherController.getTemperature)

router.get("/getWeatherDataByCity",WeatherController.getWeatherDataByCity)

router.get("/getMemes", MemesController.getMemes)

router.post("/getMemeById", MemesController.getMemeById)



module.exports = router;