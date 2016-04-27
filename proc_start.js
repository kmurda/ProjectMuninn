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
var date = Date.now();
//speeds
const MAX = 0.6;
const MID = 0.4;
const MIN = 0.2;

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

		//Check drone status before launching

		var ref = {};
		var pcmd = {};

		var emergency = true;

		setInterval(function(){
			console.log('Takeoff...');
			ref.emergency = true;	
			ref.fly = true;		
		},1000);

		//-------------------------------------------------------------------
		//	Blank action function (autonomous)
		//-------------------------------------------------------------------
		//	
		// Available pcmd commands
		// pcmd.front = 0.1 - 1.0; {back,left, right, clockwise, counterClockwise}
		//-------------------------------------------------------------------
		
		setInterval(function() {
			//control.ref({fly: fly, emergency: emergency});
			//control.pcmd();
			//control.flush();
		}, 30);

		setInterval(function(){
			//enter code to execute
		}, 30);

		setInterval(function(){
			//enter code to execute
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
			console.log("No object");
			setInterval(function(){
				console.log("Moving forward..");
				pcmd.front = MIN;
			},30);			
		}else if(loc == 001){
			//object on your left
			setInterval(function(){
				console.log("Object on your left");
				//hover for while calculating next step
				pcmd = {}; 
				console.log("Detected an object on the left, calculating movement...");
				//start turning toward right
				console.log("Turning torwards the right...");
				pcmd.right = MIN;
				if(loc == 000){
					pcmd = {};
				}
				pcmd.front = MIN;				
			},30);
		}else if(loc == 010){
			//object on your right
			setInterval(function(){
				console.log("Object on your right");
				//hover while calculating next move
				pcmd = {};
				console.log("Detected an object on the right, calculating next move...");
				//start turning toward the left
				console.log("Turning torwards the left");
				pcmd.left = MIN;
				if(loc == 000){
					pcmd = {};
				}
				//continue fwd
				pcmd.front = MIN;
			},30);			
		}else if(loc == 011){
			//object on right and left
			setInterval(function(){
				console.log("Object on your right and left");
				// Narrow pathway
				console.log("Drone has detected a narrow pathway");
				console.log("Evaluating next move...");
				pcmd = {};
				//drone can move left or right until oneside is cleared
				pcmd.left = MIN;
				if(loc == 000){
					pcmd = {};
				}
				//continue forward
				pcmd.front = MIN;
			},30);			
		}else if(loc == 100){
			//object infront 
			setInterval(function(){
				console.log("Object upfront")
				//Stop/hover
				pcmd = {};
				//turn towards the right
				pcmd.right = MIN;
				if(loc == 000){
					pcmd = {};
				}
				//continue fwd
				pcmd.front = MIN;
			},30);
			
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
		
		
		//End the sequence
		
		setInterval(function() {
			control.ref(ref);
			control.pcmd(pcmd);
			control.flush();
		}, 30);
	
	
	});


//--------------------------------------------------------------------------------------
});


//client.write('exit\r');

client.on('end', () => {
	console.log('disconnected from server');
}); 








