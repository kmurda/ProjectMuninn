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
	if(loc == 010){
		
	}
	
		if(loc == 000){
			//All clear
			console.log("No object");			
		}else if(loc == 001){
			//object on your left
			console.log("Object on your left");			
		}else if(loc == 010){
			//object on your right
			console.log("Object on your right");			
		}else if(loc == 011){
			//object on right and left
			console.log("Object on your right and left");			
		}else if(loc == 100){
			//object infront 
			console.log("Object upfront");			
		}else if(loc == 101){
			//object infont and left
			console.log("Object on front and left");			
		}else if(loc == 110){
			//object infront and right
			console.log("Object on front and right");			
		}else if(loc == 111){
			//object all three sides
			console.log("Object on all sides");			
		}else{
			console.log("Check your input data");			
		} 
			
	//check data
	console.log(loc);
	console.log(typeof loc);
  
});

  //console.log("\n\n");

client.on('end', () => {
  console.log('disconnected from server');
}); 

