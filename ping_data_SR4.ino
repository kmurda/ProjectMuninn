#define trigPin1 3
#define echoPin1 2
#define trigPin2 4
#define echoPin2 5
#define trigPin3 7
#define echoPin3 8

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
SonarSensor(trigPin1, echoPin1);
RightSensor = distance;
SonarSensor(trigPin2, echoPin2);
LeftSensor = distance;
SonarSensor(trigPin3, echoPin3);
FrontSensor = distance;

//Calculate high/low for object detection

  //Front Sensor
  if(frontsensor <= 10){
        front = HIGH;
  }else

  //Left Sensor
  if(LeftSensor <= 10){
  	left = HIGH;
  }else{
  	left = LOW;
  }


        front = LOW;
  }

  //Right Sensor
  if(RightSensor <=10){
  	right = HIGH;
  }else{
  	right = LOW;
  }

//DEBUG Section
Serial.print(LeftSensor);
Serial.print(" - ");
Serial.print(FrontSensor);
Serial.print(" - ");
Serial.println(RightSensor);

//Print to Serial enable when live testing
Serial.print(Front:);
Serial.println(front);
Serial.print(Right:);
Serial.println(right);
Serial.print(Left:);
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
