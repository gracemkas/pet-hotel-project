const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/pokemon', (req, res) => {
    console.log('got to router GET');
    pool.query(`SELECT "pokemon".id, "pokemon".name, "pokemon".type, "pokemon".color, "pokemon".checked_in, "pokemon".image, "trainers".name_trainer FROM "pokemon"
    JOIN "trainers" ON "pokemon".trainer_id = "trainers".id
    GROUP BY "pokemon".id, "pokemon".name, "trainers".name_trainer, "pokemon".type, "pokemon".color, "pokemon".checked_in, "pokemon".image;`)
      .then( (results) => {
        console.log('Here are the router get results', results);
        res.send(results.rows);
      }).catch( (error) => {
        console.log('error from router get', error);
      }) 
  });

router.post('/pokemon', (req, res) => {
    console.log('got to router POST');
    console.log('here is the req.body', req.body);
    const pokemon = req.body;
    pool.query(`INSERT INTO "pokemon" 
                ("name", "type", "color", "checked_in", "image", "trainer_id")
                VALUES ($1, $2, $3, $4, $5, $6);`, [pokemon.name, pokemon.type, pokemon.color, pokemon.checked_in, pokemon.image, pokemon.trainer_id])
                .then( (results) => {
                  console.log('results from database', results);
                  res.sendStatus(201);
                }).catch( (errFromPG) => {
                  console.log('error from database', errFromPG);
                  res.sendStatus(500);
                })
  });

  router.delete('/pokemon/:id', (req, res) => {
    console.log('Got to DELETE');
    console.log(req.params.id);
    pool.query(`DELETE FROM "pokemon" WHERE "id" = $1;`, [req.params.id])
      .then( (results) =>{
        console.log('GOT TO DELETE', results);
        res.sendStatus(200);
      }).catch( (error) => {
        console.log('Error from delete', error);
        
      })
  });

  router.post('/trainer', (req, res) => {
    console.log('got to router trainer POST');
    console.log('here is the req.body', req.body);
    const trainer = req.body;
    pool.query(`INSERT INTO "trainers" 
                ("name_trainer")
                VALUES ($1);`, [trainer.name])
                .then( (results) => {
                  console.log('results from database', results);
                  res.sendStatus(201);
                }).catch( (errFromPG) => {
                  console.log('error from database', errFromPG);
                  res.sendStatus(500);
                })
  });

  router.get('/trainer', (req, res) => {
    console.log('got to trainer router GET');
    pool.query(`SELECT "trainers".name_trainer, "trainers".id, count("pokemon".trainer_id) FROM "trainers"
    LEFT OUTER JOIN "pokemon" ON "trainers".id = "pokemon".trainer_id
    GROUP BY "trainers".name_trainer, "trainers".id;`)
      .then( (results) => {
        console.log('Here are the router get results', results);
        res.send(results.rows);
      }).catch( (error) => {
        console.log('error from router get', error);
      }) 
  });

  router.delete('/trainer/:id', (req, res) => {
    console.log('Got to DELETE');
    console.log(req.params.id);
    pool.query(`DELETE FROM "trainers" WHERE "id" = $1;`, [req.params.id])
      .then( (results) =>{
        console.log('GOT TO DELETE', results);
        res.sendStatus(200);
      }).catch( (error) => {
        console.log('Error from delete', error);      
      })
  });


  module.exports = router;