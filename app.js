const express = require('express')
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const https = require('https');
const { PORT } = process.env;
const { API_KEY } = process.env;


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("pubblic"));



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + " &units=metric&appid=" + API_KEY + ""

    try {
        https.get(url, (response) => {
            // console.log(statusCode);
            response.on("data", (data) => {
                let weatherType = JSON.parse(data);
                const temp = weatherType.main.temp;
                const description = weatherType.weather[0].description;
                const icon = weatherType.weather[0].icon;
                const iconUrl ="http://openweathermap.org/img/wn/" +icon +"@2x.png"

                res.write(`<h1>The temperature in ${query} is ${temp} degree celcius.</h1>`);
                res.write(`<h3>The weather is like ${description}</h3>`);
                res.write(`<p>Cloud looks like <img src=${iconUrl}></p>`);
                res.send();
            })
        })
    } catch (error) {
        console.log(error.message);
    }


})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})