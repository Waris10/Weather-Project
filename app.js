/* eslint-env es6 */
/* eslint-disable no-console */

const express = require('express')
const https = require('https')
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended : true }));


app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res) =>{
  const query = req.body.cityName;
  const apiKey = '7896baa223336919df39651f49b4080c'
  const unit = 'metric'
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + unit

  https.get(url, (response) =>{
    console.log(response.statusCode);

    response.on('data', (data) =>{
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
      res.write('<p>The weather is currently '+ weatherDescription + '</p>')
      res.write('<h1>the temperature in ' + query + ' is ' + temp + 'degree Celcius</h1>')
      res.write('<img src = ' + imageURL + ' >');
      res.send()
    })
  })

})

app.listen(port, () =>{
  console.log('PORT 3000 IS ACTIVE');
});
