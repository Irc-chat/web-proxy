var net = require('net');

// create a webscoket server on port 10023
var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({port: 10023})
wss.on('connection', function (ws) {

	var client = new net.Socket();
	client.connect(10001, 'ec2-35-180-30-241.eu-west-3.compute.amazonaws.com', function() {
		console.log('Connected');
		ws.send("connected")
	});

	client.on('data', function(data) {
		console.log('Received: ' + data);
		ws.send(data)
	});

	client.on('close', function() {
		ws.send("closed")
	})

  ws.on('message', function (message) {
    client.write(message)
  })
})