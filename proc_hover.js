var arDrone = require('ar-drone');
var control = arDrone.createUdpControl();

setInterval(function() {
  control.ref({fly: true, emergency: true});
  control.pcmd({});
  control.flush();  
}, 30);

