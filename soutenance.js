var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Cylon = require('cylon');

app.use(express.static('ui'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/ui/index.html');
});

io.on('connection', function(socket){
  console.log('new socket connected');

  socket.on('disconnect', function(){
    console.log('socket disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
  listenHeadset();
});


function listenHeadset(){
  console.log('starting headset...');

  Cylon.robot({
  	connections: {
  		neurosky: {adaptor: 'neurosky', port: '/dev/tty.MindWaveMobile-DevA'},
  	},

  	devices: {
  		headset: {driver: 'neurosky', connection: 'neurosky'},
  	},

  	work: function(my){
      my.headset.on('attention', function(data) {
        io.emit('attention', data);
        // console.log("attention:" + data);
      });

      my.headset.on('meditation', function(data) {
        io.emit('meditation', data);
        // console.log("meditation:" + data);
      });
  	}
  }).start();
}
