//import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import Users from './component/Users';
import Weather from './component/Weather';


function App() {
  
  const [users, setUsers] = useState([])
  const [weather, setWeather] = useState({})
  //console.log(weather)

  //fetch request everytime the component is loaded, useEffect is executed
  useEffect(() => {
    fetch("/users")

      //callback will accept response from server
      .then((res) => {
        //converting json to js object format
        return res.json()
      })
      //updating the weather state with data received from fetch request
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  function handleClick(id) {
    fetch("/users/"+id)

      //callback will accept response from server
      .then((res) => {
        //converting json to js object format
        return res.json()
      })
      //updating the weather state with data received from fetch request
      .then((data) => {
        setWeather(data.weather)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (

    //jsx populate the state data 
    <div className="App">
      <Users users={users} handleClick={handleClick}/>
      <Weather weather={weather}/>
    </div>
  );
}

export default App;

// {
//   "cityName": "San Francisco",
//   "humidity": 58,
//   "windSpeed": 8.01,
//   "lat": 37.7749,
//   "lon": -122.4194,
//   "weather": {
//       "id": 800,
//       "main": "Clear",
//       "description": "clear sky",
//       "icon": "01d"
//   },
//   "temp": 79.86,
//   "date": 1662659915
// }
