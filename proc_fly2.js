var arDrone = require('ar-drone');
var client  = arDrone.createClient();

//Create an instance of the ar-drone net
var net = require('net');

//Global variables
var loc;		// loc = location
int const SPD = 0.03;

var sh = net.connect({port: 23, host: '192.168.1.1'}, () => {

	//'connect' listener  
	sh.write('stty -F /dev/ttyO3\r');
	sh.write('stty -F /dev/ttyO3 -raw\r');
	sh.write('stty -F /dev/ttyO3 9600\r');
	sh.write('cat /dev/ttyO3\r');
	console.log('connected to server!');
});

client.takeoff();

sh.on('data', (data) => {
	
	//console.log(data.toString());
	loc = data.toString().trim();	
	console.log(loc);  
});  // telnet collecting data

if(loc == "front"){
	//move fwd
	console.log("Moving fwd!...");
	client.front(SPD);
}else if (loc == "stop"){
	//Object detected!
	console.log("Object detected!");
	client.stop();
	console.log("Hovering!...");  
} 


client
  .after(10000, function() {
    this.stop();
    this.land();
  });
  
// ends telnet stuff
sh.on('end', () => {
	console.log('disconnected from server');
});  