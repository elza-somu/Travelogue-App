const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
// const Item = require('./models/logs');

mongoose.connect('mongodb://localhost/travelogue', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Bring in data from models
// let Log = require('./models/logs');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db connected.');
});

app.use(express.static('public'));

// Load view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');


// Body Parser - parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.get('/', function(req, res){
    let logs =[
      {
        id:1,
        date: '10/12/2019',
        visited:'Niagra',
        description: 'Amazing view and the winter lights were fantastic'
      }
    ]
    // if (err){
    //   console.log(err);
    // } else {
      res.render('index', {
        title:'Travelogue', 
        logs: logs
      });
    // }
});

app.get('/logs', function(req, res){
  res.render('logs',{
    title: ' Input your Travels'
  })
})


app.listen(port, function(){
  console.log(`Server running on port ${port}`);
});