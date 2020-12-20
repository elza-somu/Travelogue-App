const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Public Folders route
app.use(express.static(path.join(__dirname, 'public')));

// Load view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');


//Home Page Route 
app.get('/', function(req, res){
  
  res.render('index', {
      title:'Travelogue', 
    
    });
  }
);



app.listen(port, function(){
  console.log(`Server running on port ${port}`);
});