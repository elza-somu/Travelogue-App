const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/travelogue', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
git
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('db connected.');
});

app.use(express.static('public'));

app.set('view engine', 'pug');



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
  res.render('index', {});
});

