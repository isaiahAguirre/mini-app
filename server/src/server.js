const express = require('express');
const app = express();
const port = 8081;

const knex = require('knex')(require('../knexfile.js')["development"])

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Application is running')
})

app.listen(port, () =>{
    console.log(`server running on port ${port}`)
})


app.get('/movies', (req,res) => {
    knex('movies')
        .select('*')
        .then(movies => res.json(movies))
})