var app = angular.module('plunker', ['btford.socket-io'])
.factory('socket', function (socketFactory) {
    var socketConnection = io.connect('http://192.168.31.248:3000');
    var socket = socketFactory({
        ioSocket: socketConnection
    });
    return socket;
}).controller('MainCtrl', function($scope, socket) {
    $scope.devices = [];
    socket.emit('get_device');
    socket.on('return_device', function(data){
        $scope.devices = data;
    });

    setInterval(function(){
        socket.emit('get_device');
    }, 1000);   
});
