import app from "./app";
let path = require('path');

const PORT = 3000;

app.listen(PORT, ()=>{
  console.log('Test: Listening server on port', + PORT);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/browser/index.html'));
});