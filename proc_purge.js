var proc1;
var proc2

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
  proc1 = data.toString();
  
  /*parse the data and capture what to killall */
  
  //proc2 = proc1 =~(/(\d+)\sroot\s+\d+\s\w\s+/bin/sh/);
  
  //console.log(proc2[2]);
  
  console.log(proc1);
  //client.end();
  
   
});

client.write('exit\r');

client.on('end', () => {
  console.log('disconnected from server');
}); 