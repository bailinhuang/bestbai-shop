const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const morgan = require('morgan');
const bodyParser = require ('body-parser');

app.use(morgan('tiny'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(enableCORS);

const port = 3000;

//Develop purposes
function enableCORS(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}

app.get('*', function(request, response) {
  response.send("hello World");
});

server.listen(port);

console.log(`Server listening on ${port}`);
// server.listen(8080, function(){
//   console.log('listening on localhost : 8080')
// })

app.use(morgan('tiny'));


//More info about sockets functions here : https://socket.io/docs/emit-cheatsheet/

io.sockets.on('connection', function (socket) {
  console.log('Connected', socket.id);

  //When the client emits a sendMessage, it will broadcast
  //the message to everysocket BUT the client.
  socket.on('sendMessage', function(message) {
    console.log(message);
    //Emits to the client the new message
    socket.broadcast.emit("sendBroadcastMessage", message);
  });

  socket.on('disconnect', function(){
    // remove the username from global usernames list
    console.log("User disconnect")
  });
});
