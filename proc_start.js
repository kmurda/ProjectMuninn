//---------------------------------------------------------------------------------------
// Project name: Muninn
// Developer: Edmund Sannda
// Engineers: Kyle Upton, Brendon Knapp and Carlton Allred
// Obejective: Using Ultrasound sensors for collision detection
// Mission: Drone autonomous flight using HC-SR4 sensors
// Live video ffplay tcp://192.168.1.1:5555
//---------------------------------------------------------------------------------------

//Required autobot
var arDrone = require('ar-drone');

//Create an instance of the ar-drone
var client = arDrone.createClient();
	
// Create an instance of the ar-drone net (for telnet access)
var net = require('net');

//---------------------------------------------------------------------------------------
//	Global variables
//---------------------------------------------------------------------------------------

var loc;

//speed
const SPD = 0.03;
var battery;
var batteryState;
var altitude;
var flyState;


//---------------------------------------------------------------------------------------
//	Telnet code!
//	The script will login to the drone's shell via telnet port:23
//	IP: 192.168.1.1 and run command script to prep serial connection
//	between drone and arduino at 9600 baud rate
//---------------------------------------------------------------------------------------     
      

var sh = net.connect({port: 23, host: '192.168.1.1'}, () => {

	//'connect' listener  
	sh.write('stty -F /dev/ttyO3\r');
	sh.write('stty -F /dev/ttyO3 -raw\r');
	sh.write('stty -F /dev/ttyO3 9600\r');
	sh.write('cat /dev/ttyO3\r');
	console.log('connected to server!');
});

//Initial drone take off code
//client.takeoff();

//--------------------------------------------------------------------------------------- 
//	AR-Drone telnet code connects to the drone and pull sensor
//  from arduino that are being fed to drone's ttyO3 serial line
//---------------------------------------------------------------------------------------

sh.on('data', (data) => {
	
	//console.log(data.toString());
	loc = data.toString().trim();	
	console.log(loc);  
	/*
		loc variable contains the following commands that are being calculated in arduino 
		board
		front, back, left, right, clockwise, counterclockwise, land, and stop
	*/

//---------------------------------------------------------------------------------------
// Access drone instance and collect navidagtion data
//---------------------------------------------------------------------------------------

client.on('navdata', function(navData) {
	if (!navData.demo) {
		return;
	}
	
	// Collect some navigation data & save
	altitude = navData.demo.altitudeMeters;
	battery = navData.demo.batteryPercentage;
	flyState = navData.demo.flyState;
			
	//Keep checking batteryPercentage
	if(navData.demo.batteryPercentage <= 40){
		//console.log("Battery warning\n");
		batteryState = "Warning!";
	}else if(navData.demo.batteryPercentage < 30){
		//console.log("Battery critical\n");
		batteryState = "Critial!!!";
		//set loc to "stop"
		loc = "return";
	}else{
		//console.log("Battery GOOD!");
		batteryState = "GOOD!";
	} // end battery checks
			
});  // ends navdata  

//---------------------------------------------------------------------------------------
//	Log Navigation data outside navdata collection
//---------------------------------------------------------------------------------------

console.log("Battery Status: ", batteryState);
console.log("\n");
console.log("Altitude: ", altitude);

//--------------------------------------------------------------------------------------- 
//	AR-Drone autonomous code! (start by hovering in place)
//---------------------------------------------------------------------------------------

		
switch(loc){
	case "front":
		console.log("Moving fwd!...");
		//client.front(0.03);
		//client.front(SPD);
	break;
	
	case "back":
		console.log("Object detected behind!...");
		//no action, used by arduino for room measuriments 
	break;
	
	case "left":
		console.log("Moving left!...");
		//client.left(SPD);
	break;
	
	case "right":
		console.log("Moving right!...");
		//client.right(SPD);
	break;
	
	case "clockwise":
		console.log("Turning clockwise");
		//client.clockwise(SPD);
	break;
	
	case "counterclockwise":
		console.log("Turning counterclockwise");
		//client.counterclockwise(SPD);
	break;

	case "stop":
		console.log("Hovering!...");
		//client.stop(); 
		//client.land();	
	break;
	
	case "return":
		console.log("Battery critical\n");
		//client.stop();
		//Initiate return to origin
		
	break;
	
	case "land":
		console.log("Mission complete!!");
		//client.land();
	
	break;
	
	default:
		console.log("Waiting!...");
		//client.stop();
	
} // end switch

});  // ends client.on data

//client.write('exit\r');

// exit telnet
sh.on('end', () => {
	console.log('disconnected from server');
});   








