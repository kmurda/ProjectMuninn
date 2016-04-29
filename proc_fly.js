var arDrone = require('ar-drone');
var control = arDrone.createUdpControl();
var start   = Date.now();

var ref  = {};
var pcmd = {};

console.log('Recovering from emergency mode if there was one ...');
ref.emergency = true;
setTimeout(function() {
  console.log('Takeoff ...');

  ref.emergency = true;
  ref.fly       = true;

}, 1000);

setTimeout(function() {
  console.log('Move fwd slightly ...');

  pcmd.front = 0.1;
  
}, 4000);

setTimeout(function() {
  console.log('Landing ...');
  ref.emergency = false;
  ref.fly = false;
  pcmd = {};
}, 8000);


setInterval(function() {
  control.ref(ref);
  control.pcmd(pcmd);
  control.flush();
}, 30);
