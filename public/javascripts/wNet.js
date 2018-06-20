importScripts('/socket.io/socket.io.js');

var socket = io.connect('http://127.0.0.1:3000', {
    timeout: 500,
    reconnection: true
});

onmessage = function(e) {
	console.log(e.data);
	socket.emit('watch', e.data);
};


socket.on('data', (chunk) => {
    self.postMessage({cmd:'data', data:chunk}, [chunk]);
})
.on('end', () => {
    console.log('Finished!!!');
})
.on('accel', (chunk) => {
    self.postMessage({cmd:'accel', data:chunk});
});
