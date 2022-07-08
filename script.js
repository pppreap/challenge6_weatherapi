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
var search = document.querySelector('.search');

/*right apis used
const key = dd4aacd5d922b0989a6c7cc5ba3268d7;*/

//on event of clicking button of city input, data is retrieved json parsed response, and use DOM to access property of datas
button.addEventListener('click',function(){
fetch('https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=dd4aacd5d922b0989a6c7cc5ba3268d7&units=imperial')
.then(response => response.json())
.then(data=> {

    var cityName = data["city"]["name"];
    city.innerHTML= cityName;
//var dateName = data["list"][0]["dt_txt"];
 //display icon with openweather icon src  URL is http://openweathermap.org/img/wn/10d@2x.png
    var iconName = data["list"][0]["weather"][0]["icon"];
    let url = "http://openweathermap.org/img/wn/" + iconName + "@2x.png";
    icon.src = url;
        
    var tempValue = data["list"][0]["main"]["temp"];
    temp.innerHTML = "Temp: "+ tempValue + " °F";
    var windValue = data["list"][0]["wind"]["speed"];
    wind.innerHTML = "Wind: " + windValue + " MPH";
    var humidValue = data["list"][0]["main"]["humidity"];
    humid.innerHTML = "Humidity: " + humidValue +"%";
    
    //current date display using moment
    var currentDay = moment().format("L").toString();
    date.innerHTML = currentDay;


    return data;
})
 //use a separate API for UV since it was not part of the api above, only displayed in current forecast on top
.then((data) => {
    var latValue = data["city"]["coord"]["lat"];
    var lonValue = data["city"]["coord"]["lon"];
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+latValue+'&lon='+lonValue+'&appid=dd4aacd5d922b0989a6c7cc5ba3268d7')
    .then(response => response.json())
    .then(finalData => {
        var uvValue = finalData["current"]["uvi"];
        uv.innerHTML = "UV Index: "+ uvValue;
    if (uvValue < 3){
        document.getElementById("uv").style.backgroundColor = "green";
    } else if (uvValue > 6){
        document.getElementById("uv").style.backgroundColor = "red";
    } else {
        document.getElementById("uv").style.backgroundColor = "yellow";
    }
    })
})

 .catch(err=> alert("error format!"))
   
 });


 