const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.set('view engine', 'pug');


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
  res.render('index', {});
});

