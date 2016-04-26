#define trigPin1 3 //Blue cable
#define echoPin1 2 //Yellow cable
#define trigPin2 4 //Blue cable
#define echoPin2 5 //Yellow cable
#define trigPin3 7 //Blue cable
#define echoPin3 8 //Yellow cable

long duration, distance, RightSensor,FrontSensor,LeftSensor;

bool front; // set high when front sensor detects an obstacle
bool right; // set high when right sensor detects an obstacle
bool left; // set high when left sensor detects an obstacle

void setup()
{
Serial.begin (9600);
pinMode(trigPin1, OUTPUT);
pinMode(echoPin1, INPUT);
pinMode(trigPin2, OUTPUT);
pinMode(echoPin2, INPUT);
pinMode(trigPin3, OUTPUT);
pinMode(echoPin3, INPUT);
}

void loop() {

//Right Sensor
SonarSensor(trigPin1, echoPin1);
RightSensor = distance;
delay(100);

//Left Sensor
SonarSensor(trigPin2, echoPin2);
LeftSensor = distance;
delay(100);

//Front Sensor 
SonarSensor(trigPin3, echoPin3);
FrontSensor = distance;
delay(100);


//Calculate high/low for object detection

  //Front Sensor
  if(FrontSensor <= 30){
        front = HIGH;
  }else{
            front = LOW;
  }

  //Left Sensor
  if(LeftSensor <= 30){
  	left = HIGH;
  }else{
  	left = LOW;
  }

  //Right Sensor
  if(RightSensor <= 30){
  	right = HIGH;
  }else{
  	right = LOW;
  }

/*DEBUG Section
Serial.print(LeftSensor);
Serial.print(" - ");
Serial.print(FrontSensor);
Serial.print(" - ");
Serial.println(RightSensor);
*/

delay(100);

//Print to Serial enable when live testing
Serial.print(front);
Serial.print(",");
Serial.print(right);
Serial.print(",");
Serial.println(left);

}

void SonarSensor(int trigPin,int echoPin)
{
digitalWrite(trigPin, LOW);
delayMicroseconds(2);
digitalWrite(trigPin, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin, LOW);
duration = pulseIn(echoPin, HIGH);
distance = (duration/2) / 29.1;

}
