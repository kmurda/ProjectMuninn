var arDrone = require('ar-drone');
var client = arDrone.createClient();

client.on('navdata', function(navData) {
  if (!navData.demo) {
    return;
  }

	//Building content file
	
	var content = {"cY":navData.demo.rotation.y,
				   "cX":navData.demo.rotation.x,
				   "cZ":navData.demo.rotation.z,
				   "pitch":navData.demo.rotation.pitch,
				   "roll":navData.demo.rotation.roll,
				   "phi":navData.demo.rotation.phi,
				   "theta":navData.demo.rotation.theta,
				   "yaw":navData.demo.rotation.yaw,
				   "psi":navData.demo.rotation.psi,
				   "vY":navData.demo.yVelocity,
				   "vX":navData.demo.xVelocity,
				   "vZ":navData.demo.zVelocity,
				   "Battery":navData.demo.batteryPercentage,
				   "droneState":navData.demo.flyState,
				   "location":navData.demo.controlState,
				   "Altitude":navData.demo.altitudeMeters};
				   
	console.log("CONTENT_FILE has... \n", content);
	
});
