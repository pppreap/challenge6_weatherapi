//declare DOM variables
var button = document.querySelector('.search');
var city = document.querySelector('.current');
var date = document.querySelector('.date');
var icon = document.querySelector('.icon');
var inputValue = document.querySelector('.inputValue');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humid = document.querySelector('.humid');
var uv = document.querySelector('.uv'); 



/*right apis used
 uv api: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=hourly&appid=dd4aacd5d922b0989a6c7cc5ba3268d7
forecast api: api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}   &units=imperial

stating key  
const key = dd4aacd5d922b0989a6c7cc5ba3268d7;*/

//on event of clicking button of city input , data is retrieved json parsed response, and use DOM to access property of datas
button.addEventListener('click',function(){
fetch('https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=dd4aacd5d922b0989a6c7cc5ba3268d7&units=imperial')
.then(response => response.json())
// .then(data => console.log(data))
.then(data=> {
        var cityName = data["city"]["name"];
        city.innerHTML= cityName;
        //var dateName = data["list"][0]["dt_txt"];
        //date.innerHTML = dateName;

    //var iconName = data["list"][0]["weather"][0]["icon"];
    //icon.innerHTML = iconName;

    temp.innerHTML = "Temp: "+ tempValue + " °F";
    var windValue = data["list"][0]["wind"]["speed"];
    wind.innerHTML = "Wind: " + windValue + " MPH";
    var humidValue = data["list"][0]["main"]["humidity"];
    humid.innerHTML = "Humidity: " + humidValue +"%";
    var latValue = data["city"]["coord"]["lat"];
    var lonValue = data["city"]["coord"]["lat"];

    //current date display using moment
    var currentDay = moment().format("L").toString();
    document.getElementById("currentDay").innerHTML = currentDay;


    // //use a separate API for UV since it was not part of the 5day/3hr interval api, only displayed in current forecast on top
    // fetch ('https://api.openweathermap.org/data/2.5/onecall?lat='+latValue+'&lon='+lonValue+'&exclude=hourly&appid=dd4aacd5d922b0989a6c7cc5ba3268d7')
    // .then(response => response.json())
    // .then(data=> {
    //     var uvValue = data["current"]["uvi"];
    //     uv.innerHTML = "UV Index: "+ uvValue;
    // })
})     
 .catch(err=> alert("error format!"))
 });

