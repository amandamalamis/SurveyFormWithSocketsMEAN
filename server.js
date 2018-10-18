var express = require("express");
var app = express();
var path = require("path");
var session = require("express-session");
var bodyParser = require('body-parser');

// var server = app.listen(1337);
var io = require('socket.io')(server);


app.use(session({secret: 'thisisasecretkey'})); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//     response.render("index");
// })

// var server = app.listen(8000, function() {
//     console.log("listening on port 8000");
//        });
//    var io = require('socket.io').listen(server);
// io.sockets.on('connection', function (socket) {
//        console.log("Client/socket is connected!");
//        console.log("Client/socket id is: ", socket.id);
//        socket.on( "button", function (data){
//            var number = Math.floor(Math.random()* 1001);
//        socket.emit( 'server_response', { data, number });
//     })  
//    })


app.get('/', function (request, response){
  console.log("HI")
  response.render('index.ejs');
});

app.post('/submit', function (request, response){
  console.log("POST DATA \n\n", request.body)
  request.session.data = request.body;
  response.redirect('/');
})

var server = app.listen(8000, function() {
  console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
  // all the server socket code goes in here
  socket.on( "button_clicked", function (data){
      console.log(data);
      var rand = Math.floor(Math.random() * 1000) + 1;
      socket.emit( 'server_response', {server: data.client, rand: rand});
  })
})
