var front, right, left;

var net = require('net');
var client = net.connect({port: 23, host: '192.168.1.1'}, () => {
	
  //Kill all stale process for the project
  
  client.write('killall cat /dev/ttyO3\r');
  
  //client.write('exit\r');

  console.log('connected to server!');
});

client.write('ps | grep /bin/sh\r');

client.on('data', (data) => {
	
  //find staled /bin/sh process and killall
  console.log(data.toString());
  
  /*parse the data and capture what to killall 
	// pursed data is assigned here
	front = myRegex1.exec(data.toString());
	right = myRegex2.exec(data.toString());
	left = myRegex3.exec(data.toString()); */
	
  //client.end();
   
});

client.write('exit\r');

client.on('end', () => {
  console.log('disconnected from server');
}); 