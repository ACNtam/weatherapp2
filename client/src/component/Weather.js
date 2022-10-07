
const Weather = ({weather})=>{
    return(
        <div className="weather">
            <h1>{weather.cityName}</h1>
      <img alt="" src={"https://openweathermap.org/img/wn/" + weather?.weather?.icon + "@2x.png"} />  
      <h3>Temperature: {weather.temp} <span>&#176;</span> F</h3>
      <p>Date: {weather.date}</p>
      <p>WindSpeed: {weather.windSpeed}</p>
      <p>Lat: {weather.lat}</p>
      <p>Lon: {weather.lon}</p>
      <p>Humidity: {weather.humidity}</p>
        </div>
    )
}

export default Weather;