var arDrone = require('ar-drone');
var client  = arDrone.createClient();

client 

	
     .after(1000, function() { 
       this.stop(); 
    }) 
	
	.after(1000, function() {
		this.land();
		
	});

