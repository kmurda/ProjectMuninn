//-------------------------------------------------------------------
// Project name: Muninn
// Developer: Edmund Sannda
// Engineers: Kyle Upton, Brendon Knapp and Carlton Allred
// Obejective: Using Ultrasound sensors for collision detection
// Mission: Drone autonomous flight using HC-SR4 sensors
// Live video ffplay tcp://192.168.1.1:5555
//-------------------------------------------------------------------

//right sensor, x2
#define trigPin1 2 //Blue cable
#define echoPin1 3 //Yellow cable

//left sensor, x1
#define trigPin2 4 //Blue cable
#define echoPin2 5 //Yellow cable

//front sensor, y2 
#define trigPin3 6 //Blue cable
#define echoPin3 7 //Yellow cable

//back sensor, y1
#define trigPin4 8 // Blue cable
#define echoPin4 9 // Yellow cable

int const PRX = 45; // proximity
int const MAX = 100; // max


long duration, distance, RightSensor, FrontSensor, LeftSensor, BackSensor;

//Saves initial values to be used for return home and other dimension calculations
long initialFront, initialRight, initialLeft, initialBack; 

//Control flag
bool flag = true;

bool front; // set high when front sensor detects an obstacle
bool right; // set high when right sensor detects an obstacle
bool left; // set high when left sensor detects an obstacle
bool back; // set high when back sensor detects an obstacle

void setup()
{
  
Serial.begin (9600);

//right sensor
pinMode(trigPin1, OUTPUT);
pinMode(echoPin1, INPUT);

//left sensor
pinMode(trigPin2, OUTPUT);
pinMode(echoPin2, INPUT);

//front sensor
pinMode(trigPin3, OUTPUT);
pinMode(echoPin3, INPUT);

//back sensor
pinMode(trigPin4, OUTPUT);
pinMode(echoPin4, INPUT);

}

void loop() {

//Right Sensor
SonarSensor(trigPin1, echoPin1);
RightSensor = distance;
if(flag){
initialRight = distance;
}
delay(100);


//Left Sensor
SonarSensor(trigPin2, echoPin2);
LeftSensor = distance;
if(flag){
initialLeft = distance;
}
delay(100);

//Front Sensor 
SonarSensor(trigPin3, echoPin3);
FrontSensor = distance;
if(flag){
initialFront = distance;
}
delay(100);

//Back Sensor
SonarSensor(trigPin4, echoPin4);
BackSensor = distance;
if(flag){
initialBack = distance;
}
delay(100);

//Keep initial value the same
flag = false;


//call the processing function


/*
//Check initial value
Serial.print(initialFront);
Serial.print(" - ");
Serial.print(initialBack);
Serial.print(" - ");
Serial.print(initialRight);
Serial.print(" - ");
Serial.println(initialLeft);
Serial.print("\n\n");

delay(100);

//DEBUG Section
Serial.print(FrontSensor);
Serial.print(" - ");
Serial.print(BackSensor);
Serial.print(" - ");
Serial.print(RightSensor);
Serial.print(" - ");
Serial.println(LeftSensor);

delay(100);
*/

//Print to Serial enable when live testing
//Serial.print(front);
//Serial.print(back);
//Serial.print(right);
//Serial.println(left);

//Send a specific command to the drone
proc_main(FrontSensor, BackSensor, RightSensor, LeftSensor);

delay(100);

} // ends main loop

void SonarSensor(int trigPin,int echoPin)
{
digitalWrite(trigPin, LOW);
delayMicroseconds(2);
digitalWrite(trigPin, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin, LOW);
duration = pulseIn(echoPin, HIGH);
distance = (duration/2) / 29.1;

}  // ends SonarSensor()


// Proc function
void proc_main(int FrontSensor, int BackSensor, int RightSensor, int LeftSensor){


  //Calculate high/low for object detection

  //Front Sensor
  if(FrontSensor <= MAX){
        front = HIGH;
  }else{
        front = LOW;
  }

  //Left Sensor
  if(LeftSensor <= MAX){
    left = HIGH;
  }else{
    left = LOW;
  }

  //Right Sensor
  if(RightSensor <= MAX){
    right = HIGH;
  }else{
    right = LOW;
  }

  //Back Sensor
  if(BackSensor <= MAX){
    back = HIGH;    
  }else{
    back = LOW;  
  }


  if(front == 0 && back == 0 && right == 0 && left == 0){
        Serial.println("front");
        delay(500);
  }else if(front == 0 && back == 0 && right == 0 && left == 1){
        Serial.println("right");
        delay(500);
      
  }else if(front == 0 && back == 0 && right == 1 && left == 0){
      Serial.println("left"); 
      delay(500);      
  }else if(front == 0 && back == 0 && right == 1 && left == 1){
        Serial.println("front");
        delay(500);
  }else if(front == 0 && back == 1 && right == 0 && left == 0){	  
	  Serial.print("front");  
    delay(500);  
  }else if(front == 0 && back == 1 && right == 0 && left == 1){
      Serial.print("clockwise");
      delay(500);    
  }else if(front == 0 && back == 1 && right == 1 && left == 0){
      Serial.print("front");
      delay(500);   
  }else if(front == 0 && back == 1 && right == 1 && left == 1){ 
      Serial.print("land"); 
      delay(500);     
  }else if(front == 1 && back == 0 && right == 0 && left == 0){
	  //object infront, but nothing of the side of behind
	  Serial.print("counterclockwise");
    delay(500);  
  }else if(front == 1 && back == 0 && right == 0 && left == 1){
  //object infront and on the left
      Serial.print("counterclockwise");
      delay(500);   
  }else if(front == 1 && back == 0 && right == 1 && left == 0){
	//seeing the second wall or object
	    Serial.print("counterclockwise");  
      delay(500);    
  }else if(front == 1 && back == 0 && right == 1 && left == 1){
	  //Weird situation... land the drone
	  Serial.print("land");  
    delay(500);
  
  }else if(front == 1 && back == 1 && right == 0 && left == 0){
	  //Weird situation... land the drone
	  Serial.print("land");  
    delay(500);
  
  }else if(front == 1 && back == 1 && right == 0 && left == 1){
	  //Weird situation... land the drone
	  Serial.print("land");  
    delay(500);
  
  }else if(front == 1 && back == 1 && right == 1 && left == 0){
	  //Weird situation... land the drone
	  Serial.print("land");  
    delay(500);
  
  }else if(front == 1 && back == 1 && right == 1 && left == 1){
	  //Weird situation... land the drone
	  Serial.print("land");  
    delay(500);
  
  }else{
	  //case we are not reading any data from the sensors
	  Serial.print("stop");  // sent while waiting for correct sensor reading
    delay(500);
  
  }  
  
} // end proc_start() function
