//-------------------------------------------------------------------
// Project name: Muninn
// Developer: Edmund Sannda
// Engineers: Kyle Upton, Brendon Knapp and Carlton Allred
// Obejective: Using Ultrasound sensors for collision detection
// Mission: Drone autonomous flight using HC-SR4 sensors
// Live video ffplay tcp://192.168.1.1:5555
//-------------------------------------------------------------------

	//Create an instance of the ar-drone
	var arDrone = require('ar-drone');
	var control = arDrone.createUdpControl();
	
	// Create an instance of the ar-drone net
	var net = require('net');
	
	// Create an instance of the ar-drone navData
	var patron = arDrone.createClient();

//-------------------------------------------------------------------
//	Global variables
//-------------------------------------------------------------------

var loc;

//-------------------------------------------------------------------
//	Telnet code!
//	The script will login to the drone's shell via telnet port:23
//	IP: 192.168.1.1 and run command script to prep serial connection
//	between drone and arduino at 9600 baud rate
//-------------------------------------------------------------------     
      

var client = net.connect({port: 23, host: '192.168.1.1'}, () => {

	//'connect' listener  
	client.write('stty -F /dev/ttyO3\r');
	client.write('stty -F /dev/ttyO3 -raw\r');
	client.write('stty -F /dev/ttyO3 9600\r');
	client.write('cat /dev/ttyO3\r');
	console.log('connected to server!');


client.on('data', (data) => {
	
	//console.log(data.toString());
	loc = data.toString();
	
	
//----------------------------------------------------------------------------------------------

			//------------------------------------------------------------------- 
		//	AR-Drone autonomous code! (start by hovering in place)
		//-------------------------------------------------------------------

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
		
		setInterval(function() {
			control.ref({fly: fly, emergency: emergency});
			control.pcmd();
			control.flush();
		}, 30);

		setInterval(function(){
			//emergency = emergency;
		}, 30);

		setInterval(function(){
			//fly = fly;
		}, 30);

		//-------------------------------------------------------------------
		//	Navdata code!
		//-------------------------------------------------------------------

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

		if(loc == 000){
			//All clear
			console.log("No object")
			
		}else if(loc == 001){
			//object on your left
			console.log("Object on your left")
			
		}else if(loc == 010){
			//object on your right
			console.log("Object on your right")
			
		}else if(loc == 011){
			//object on right and left
			console.log("Object on your right and left")
			
		}else if(loc == 100){
			//object infront 
			console.log("Object upfront")
			
		}else if(loc == 101){
			//object infont and left
			console.log("Object on front and left")
			
		}else if(loc == 110){
			//object infront and right
			console.log("Object on front and right")
			
		}else if(loc == 111){
			//object all three sides
			console.log("Object on all sides")
			
		}else{
			console.log("Check your input data")
			
		}
	
	
	});


//--------------------------------------------------------------------------------------
});


//client.write('exit\r');

client.on('end', () => {
	console.log('disconnected from server');
}); 








