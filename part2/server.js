var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
let fs = require('fs');

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

// Challenge 1:
// Create a POST route for "/create/:name/:age" that creates an object that looks like this: { "name": "troy", "age": 20 } Then take that object and insert it into storage.json
app.post('/create/:name/:age', (req,res)=>{
  let storage = fs.readFileSync(__dirname+'/storage.json', 'utf8')
  let data = JSON.parse(storage)
  let obj = {name: req.params.name, age:req.params.age};

  data.push(obj);
  fs.writeFileSync(__dirname+'/storage.json', JSON.stringify(data));
  res.send(data)
})

// Challenge 2:
// Create a Get route for "/" that returns all of the objects inside storage.json.
app.get('/', (req,res)=>{
  let objects = fs.readFileSync('storage.json', 'utf8');
  res.send(objects);
})

// Challenge 3:
// Create a Get route for "/:name" that returns the first object in storage.json that matches the name. If there is no object in storage.json that matches then return a 400 status.
app.get('/:name', (req,res)=>{
  let arr = JSON.parse(fs.readFileSync(__dirname+'/storage.json', 'utf8'))
  let user = arr.find(el => el.name === req.params.name)

  if (user){
    res.send(user)
  }
  res.sendStatus(400)
})


// Challenge 4 (stretch):
// Modify your logic so every object has and id field that automatically goes up by one for every object inserted (first object has an id of 1, second object has an id of 2 ect). Then modify challenge 3 so that it finds the object by an id instead of by name.

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
