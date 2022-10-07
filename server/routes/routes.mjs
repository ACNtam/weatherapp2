import express from "express";
import cors from "cors";
import db from "../db/db_connection.mjs";
import fetch from "node-fetch"

const router = express.Router();

router.get('/', async function (req, res, next) {

    try {
      const users = await db.any('SELECT * FROM users', [true]);
      res.send(users);
    } catch (e) {
      console.log(e)
      return res.status(500).json({message: "Error from server" });
    }
  });

  router.get('/:id', async function (req, res, next) {

    try {
      const user = await db.any('SELECT * FROM users WHERE id =$1', [req.params.id]);
     

      const params = new URLSearchParams({
        //getting users favorite city
      q: user[0].favorite_city,
      appid: process.env.API_KEY,
      units: "imperial",
    });
    const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;
  
    //a promise type, fetching to the openweather API
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
console.log(data)
    // extracted data from data object
    let weather = {
        cityName:data.name,
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        lat:data.coord.lat,
        lon:data.coord.lon,
        weather:data.weather[0],
        temp:data.main.temp,
        date:data.dt
    }

    //sending response to client which is weather
    res.json({user: user[0], weather});
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).json({message: "Error from server" });
  });  
  
  } catch (e) {
      console.log(e)
      return res.status(500).json({message: "Error from server" });
    }
  });
  
  /* post request goes here */
  /* Add users listing. */
  router.post('/', async (req, res) => {
      const user = {
      name: req.body.name,
      favorite_city: req.body.favorite_city,
      };
      console.log(user);
      try {
        const createdUser = await db.one(
          'INSERT INTO users(name, favorite_city) VALUES($1, $2) RETURNING *',
          [user.name, user.favorite_city]
        );
        console.log(createdUser);
        res.send(createdUser);
      } catch (e) {
        return res.status(500).json({message: "error on server side" });
      }
    });

    router.put('/:id', async (req, res) => {
      const user = {
      name: req.body.name,
      favorite_city: req.body.favorite_city,
      };
      console.log(user);
      try {
        const editUser = await db.one(
          'UPDATE contact SET name=$1, favorite_city=$2, WHERE id=$3 RETURNING *',
          [user.name, user.favorite_city, req.params.id]
        );
        console.log(editUser);
        res.send(editUser);
      } catch (e) {
        return res.status(500).json({message: "error on server side" });
      }
    });

  /* delete request goes here  */
  //Parameterized queries use placeholders instead of directly writing the
  //values into the statements. Parameterized queries increase security and performance.
  
  router.delete('/:id', async (req, res) => {
      // : acts as a placeholder
      const userId = req.params.id;
      try {
        await db.none('DELETE FROM users WHERE id=$1', [userId]);
        res.send({ status: 'success' });
      } catch (e) {
        return res.status(500).json({message:"error on server side " });
      }
    });
  
  export default router;