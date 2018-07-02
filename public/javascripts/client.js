var app = angular.module('AudioStreaming',['ngAria', 'ngAnimate', 'ngMaterial', 'ngSanitize']);

var filename = './bbs.mp3';

// var queue = new limited_queue();
var ring = new ring_buffer(64);
// var scene = null;
const FPS = 25;
var room = document.getElementById("room").innerHTML;

app.controller('MainCtrl', ['$scope', '$http', '$mdDialog', '$timeout', '$window', '$q', function ($scope, $http, $mdDialog, $timeout, $window, $q) {
    
    var isRecord = false;
    var block = false;
    var fileName = "";
    var data = [];
    var webAudio = false;
    $scope.btnRecord = "Record";
    $scope.clickRecord = function(){
      if(!block){
        if(isRecord){
          block = true;
          $scope.btnRecord = "Saving";
          var blob = new Blob(data);
          var downloadLink = document.createElement('a');
          downloadLink.setAttribute('download', fileName);
          downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
          downloadLink.click();
          block = false;
          $scope.btnRecord = "Record";
          data = [];
          isRecord = false;
        } else {
          $scope.btnRecord = "Stop";
          isRecord = true;
          fileName = (new Date().getTime()) + ".raw";
          console.log(fileName);
        }
      }
    };

    var audio_context;
    var gain_node;
    var streaming_node;
    var buffer;
    var scene = null;

    var channels = 1;
    var sampleRate = 44100;
    var frames = 512;

    if(webAudio){

      if (typeof audio_context !== "undefined") {

          return;     //      audio_context already defined
      }

      try {

          window.AudioContext = window.AudioContext       ||
                                window.webkitAudioContext ||
                                window.mozAudioContext    ||
                                window.oAudioContext      ||
                                window.msAudioContext;

          audio_context = new AudioContext();  //  cool audio context established

      } catch (e) {

          var error_msg = "Web Audio API is not supported by this browser\n" +
                          " ... http://caniuse.com/#feat=audio-api";
          console.error(error_msg);
          alert(error_msg);
          throw new Error(error_msg);
      }

      // var winsize;

      // --- ScriptProcessor
      streaming_node = audio_context.createScriptProcessor(frames, channels, channels);
      streaming_node.onaudioprocess = (event) => {
            var buffer = event.outputBuffer.getChannelData(0);
            if(ring.readCB((buf) => {
              for (var i = buf.length - 1; i >= 0; i--) {
                buffer[i] = buf[i];
              }
            }) != 0)
            { // read failed
              for (var i = buffer.length - 1; i >= 0; i--)
              {
                  buffer[i] = 0;
              }

            }

          // if(scene != undefined) scene.updateWf(tmp);
      }
      // ---

      // Then output to speaker for example
      // source.connect(streaming_node);
      // analyser.connect(streaming_node);
      // streaming_node.connect(gain_node);
      streaming_node.connect(audio_context.destination);
    }

    // Worker Networking
    const wNet = new Worker('javascripts/wNet.js');
    wNet.postMessage(room);
    wNet.onmessage = (a_msg) => {

        // var buff = Float32Array.from(new Int16Array(a_msg.data.data));
        // console.log('[MASTER] received: ' + buff.length);
        // console.log(buff);
        // console.log(buff.length);

        // console.log(a_msg.cmd);

        switch(a_msg.data.cmd)
        {
          case 'data':
          {
            var buff = new Float32Array(a_msg.data.data);
            if(buff.length >= frames)
            {
              if(webAudio) ring.write(buff);
              if(isRecord) data = data.concat(buff);
              var tmp = 0;
              for (var i = buff.length - 1; i >= 0; i--) {
                tmp += buff[i];
              }
              tmp /= buff.length;
              if(scene != undefined) scene.updateWf(tmp);
            }
          }
          break;

          case 'accel':
          {
            if(scene != undefined) scene.updateAC(a_msg.data.data);
          }
          break;
        }

    } // Worker Networking

    cc.game.onStart = function(){
        if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
          document.body.removeChild(document.getElementById("cocosLoading"));
        // winsize = cc.director.getWinSize();

        cc.view.setDesignResolutionSize($window.innerWidth, $window.innerHeight, cc.ResolutionPolicy.SHOW_ALL);
        cc.container.style.padding = "10px 0";
        cc.view.resizeWithBrowserSize(true);

        //load resources
        cc.LoaderScene.preload([], function () {
            scene = new MyScene();
            cc.director.pushScene(scene);
            // scene = cc.director.getRunningScene();
        }, this);
    };

    cc.game.run("gameCanvas");

  }]);; // ngMyCanvas

