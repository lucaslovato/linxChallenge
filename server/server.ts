import app from "./app";
let path = require('path');

const PORT = 3000;

app.listen(PORT, ()=>{
  console.log('Test: Listening server on port', + PORT);
});

app.get('/', function(req, res) {
  console.log('public/index.html');
  res.sendFile(path.resolve('public/index.html'));
});