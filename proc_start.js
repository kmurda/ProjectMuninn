//-------------------------------------------------------------------
// Project name: Muninn
// Developer: Edmund Sannda
// Engineers: Kyle Upton, Brendon Knapp and Carlton Allred
// Obejective: Using Ultrasound sensors for collision detection
// Mission: Drone autonomous flight using HC-SR4 sensors
//-------------------------------------------------------------------


//-------------------------------------------------------------------
//	Global variables
//-------------------------------------------------------------------

var front, right, left;
var myRegex1 = /Front:\s(\d+)/;
var myRegex2 = /Right:\s(\d+)/;
var myRegex3 = /Left:\s(\d+)/;

//-------------------------------------------------------------------
//	Telnet code!
//	The script will login to the drone's shell via telnet port:23
//	IP: 192.168.1.1 and run command script to prep serial connection
//	between drone and arduino at 9600 baud rate
//-------------------------------------------------------------------     
      
var net = require('net');
var client = net.connect({port: 23, host: '192.168.1.1'}, () => {


	//'connect' listener  
	client.write('stty -F /dev/ttyO3\r');
	client.write('stty -F /dev/ttyO3 -raw\r');
	client.write('stty -F /dev/ttyO3 9600\r');
	client.write('cat /dev/ttyO3\r');
	console.log('connected to server!');
});



client.on('data', (data) => {
	
	console.log(data.toString());
	
	//purse the data.toString() and extract 
	//boolean value for front, right, left
	
	// pursed data is assigned here
	front = myRegex1.exec(data.toString());
	right = myRegex2.exec(data.toString());
	left = myRegex3.exec(data.toString());
	
});

console.log("DEBUG::: ", front);
console.log("DEBUG::: ", right);
console.log("DEBUG::: ", left);

client.on('end', () => {
	console.log('disconnected from server');
}); 

//------------------------------------------------------------------- 
//	AR-Drone autonomous code! (start by hovering in place)
//-------------------------------------------------------------------

//Create an instance of the ar-drone
var arDrone = require('ar-drone');
var control = arDrone.createUdpControl();

var fly	= true;
var emergency = true;

setInterval(function(){
	control.ref({
		fly: fly,
		emergency: emergency
	});
	control.pcmd();
	control.flush();
	
},30);

//-------------------------------------------------------------------
//	Blank action function (autonomous)
//-------------------------------------------------------------------

setInterval(function(){
	
}, 30);

setInterval(function(){
	
}, 30);

//-------------------------------------------------------------------
//	Navdata code!
//-------------------------------------------------------------------

var patron = arDrone.createClient();

patron.on('navdata', function(navData) {
  if (!navData.demo) {
    return;
  }
  
	console.log("Altitude    : \n", navData.demo.altitudeMeters);
	console.log("Battery     : \n", navData.demo.batteryPercentage);
	console.log("DroneState  : \n", navData.demo.flyState);
	console.log("ControlState: \n", navData.demo.controlState);
	
	//Above information will be fed to index.html for live display
});

if(front ===0 && right ===0 && left === 0){
	//All clear
	
}else if(front == 0 && right === 0 && left === 1){
	//object on your left
	
}else if(front == 0 && right === 1 && left === 0){
	//object on your right
	
}else if(front == 0 && right === 1 && left === 1){
	//object on right and left
	
}else if(front == 1 && right === 0 && left === 0){
	//object infront 
	
}else if(front == 1 && right === 0 && left === 1){
	//object infont and left
	
}else if(front == 1 && right === 1 && left === 0){
	//object infront and right
	
}else if(front == 1 && right === 1 && left === 1){
	//object all three sides
	
}else{
	
}







