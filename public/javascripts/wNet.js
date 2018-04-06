importScripts('/socket.io/socket.io.js');

var socket = io.connect('http://192.168.31.2:3000', {
    timeout: 500,
    reconnection: true
});

socket.on('data', (chunk) => {
    self.postMessage({cmd:'data', data:chunk}, [chunk]);
})
.on('end', () => {
    console.log('Finished!!!');
})
.on('accel', (chunk) => {
    self.postMessage({cmd:'accel', data:chunk});
});
