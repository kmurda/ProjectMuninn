/******************************************************************
*
*Telnet CODE!!
*
******************************************************************/
     
      
var net = require('net');
var client = net.connect({port: 23, host: '192.168.1.1'}, () => {


	//'connect' listener  
	client.write('stty -F /dev/ttyO3\r');
	client.write('stty -F /dev/ttyO3 -raw\r');
	client.write('stty -F /dev/ttyO3 9600\r');
	client.write('stty -F /dev/ttyO3 9600 -parity cs8 -cstopb\r');
	client.write('cat /dev/ttyO3\r');
	client.write('chmod o+rw /dev/ttyO3\r');
	//client.write('echo -ne "991" > /dev/ttyO3\r');
	client.write('cat send.txt > /dev/ttyO3\r');
	//client.write('pwd\r');
	console.log('connected to server!');
});



client.on('data', (data) => {
	console.log(data.toString());
});

client.on('end', () => {
	console.log('disconnected from server');
}); 


