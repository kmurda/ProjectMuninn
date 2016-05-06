/******************************************************************
 *
 *		Telnet CODE!!
 *
 ******************************************************************/
 
var loc;
var pos;
 
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
	
	// Parsing test... 
	console.log(data.toString('hex'), data.toString(), data)
	
	console.log("\n");
	//check data
	console.log(loc);
	console.log(typeof loc);
  
});

  //console.log("\n\n");

client.on('end', () => {
  console.log('disconnected from server');
}); 

