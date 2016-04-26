/******************************************************************
 *
 *		Telnet CODE!!
 *
 ******************************************************************/
 
var loc;
 
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
	
	//console.log(data.toString());
	loc = data.toString();
	console.log(loc);
	
  if(loc == 100){
	  console.log("Object infront");
  }else if(loc == 101){
	  console.log("Object infront and left");
  }else if(loc == 110){
	  console.log("Object infront and right");
  }else{
	  console.log("Some bits were dropped");
  }
  
});

  //console.log("\n\n");

client.on('end', () => {
  console.log('disconnected from server');
}); 
