const express = require('express');

const app = express();
const port = 3000;
// const Item = require('./models/logs');

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/travelogue', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const { Schema } = require("mongoose");


const logsSchema = new Schema({
  date: {type: Date, required: true},
  location : {type: String, required: true},
  description : {type: String}
});

const Log = mongoose.model('Log', logsSchema);

const log1 = new Log({
  date: "10 August 2019",
  location : "Swiss, Alps",
  description : "A lovely place"
});

const defaultLogs = [log1];

Log.insertMany(defaultLogs, function(err){
  if (err){
    console.log(err);
  }else{
    console.log("Sucess!!");
  }
})


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('db connected.');
});

app.use(express.static('public'));

app.set('view engine', 'pug');



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {

  Log.find({}, function(err, logs){
    // console.log(logs);
    res.render('index', { title:'Travelogue', logs: logs});
  })

});

module.export = defaultLogs;