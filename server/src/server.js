const express = require('express');
const app = express();
const port = 8081;
const cors = require("cors");

const knex = require('knex')(require('../knexfile.js')["development"])

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Application is running')
})



//get all movies
app.get('/movies', (req,res) => {
    knex('movies')
        .select('*')
        .then(movies => res.json(movies))
})

//add a new movie
app.post('/movies', (req, res) =>{
    const {title} = req.body;

    knex('movies')
        .insert({title})
        .then(() => {
            res.status(201).json({
              message: 'Movie added successfully!',
            });
          })
          .catch((err) => {
            console.error('Database insert error:', err);
            res.status(500).json({
              message: 'An error occurred while adding the movie. Please try again.',
            });
        });
})

//remove a movie
app.delete('/movies/:id', (req, res) =>{
    const id = req.params

    knex('movies')
    .where(id)
    .del()
    .then(() => {
        res.status(201).json({
          message: 'Movie removed successfully!',
        });
      })
      .catch((err) => {
        console.error('Database delete error:', err);
        res.status(500).json({
          message: 'An error occurred while removing the movie. Please try again.',
        });
    });

})

app.listen(port, () =>{
    console.log(`server running on port ${port}`)
})