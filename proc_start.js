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
//speed
const SPD = 0.1;
var battery;
var batteryState;
var altitude;
var flyState;


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
			ref.emergency = false;	
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
		  
			//console.log("Altitude    : \n", navData.demo.altitudeMeters);
			altitude = navData.demo.altitudeMeters;
			//console.log("Battery     : \n", navData.demo.batteryPercentage);
			battery = navData.demo.batteryPercentage;
			//console.log("DroneState  : \n", navData.demo.flyState);
			flyState = navData.demo.flyState;
			//console.log("ControlState: \n", navData.demo.controlState);
			
			//Above information will be fed to index.html for live display
			
			//Keep checking batteryPercentage
			if(navData.demo.batteryPercentage <= 40){
				//console.log("Battery warning\n");
				batteryState = "Warning!";
			}else if(navData.demo.batteryPercentage < 30){
				//console.log("Battery critical\n");
				batteryState = "Critial!!!";
			}else{
				//console.log("Battery GOOD!");
				batteryState = "GOOD!";
			}
			
		});
		
		//Running
		if(loc == "stop"){
			setInterval(function(){
				console.log("Hovering..\n");
				pcmd = {};
			},30);	
			
		}else if(loc == "front" || loc == "back" || loc == "right"  || loc == "left"){
			setInterval(function(){
				console.log("Moving forward..\n");
				pcmd.loc = SPD;
			},30);	
			
		}else{
			setInterval(function(){
				console.log("Hovering..\n");
				pcmd = {};
			},30);	
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








