const util = require('util');

var CHUNK_SIZE = 0x400;

var io = require('socket.io-client');
var socket = io('http://127.0.0.1:3000');

var fs = require('fs');

var path = require('path');

var filename = './bbs.mp3';

socket.on('connect', () => {
    console.log(`CONNECTED`);
    var file_stream = fs.createReadStream(filename);

    let chunk;
    var interval = setInterval(function(){
            if (null !== (chunk = file_stream.read(CHUNK_SIZE)))
            {
                socket.emit('bcdata', chunk);
            }
        }, 50);

    file_stream.on('readable', () => {
        console.log("readable!!!");
        // let i=0;        

        // while (null !== (chunk = file_stream.read(CHUNK_SIZE))) {
        //     // console.log(util.inspect(chunk));
        //     // socket.emit('bcdata', chunk);
        //     // setTimeout(()=>
        //     // {
        //         socket.emit('bcdata', chunk);
        //     // }, i * 1000);
        //     // i++;
        // }
        // console.log("DONE");
        // socket.emit('bcend');
        // socket.close();
    })
    .on('end', ()=>{
        console.log("DONE");
        if(interval) clearInterval(interval);
        socket.emit('bcend');
        socket.close();
    });

});



