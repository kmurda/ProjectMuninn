/*/
 * Project name: Muninn
 * Developer: Edmund Sannda
 * Engineers: Kyle Upton, Brendon Knapp and Carlton Allred
 * Objective: Using UltraSound sensors for collission detection
 */
 /*
  * UltraSound data feeds
  * 3 UltraSound sensors
  * Mounted 1 facing forward, 3 facing outwards at 45 degree angle
  */

// Analog pins
const int anPin1 = 0; //front_sensor
const int anPin2 = 1; //right_sensor
const int anPin3 = 2; //left_sensor

long anVolt, mm1, mm2, mm3, right_sensor, left_sensor, front_sensor;

void setup() {
  Serial.begin(9600);
}

bool front; // set high when front sensor detects an obstacle
bool right; // set high when right sensor detects an obstacle
bool left; // set high when left sensor detects an obstacle

void read_sensor(){
  //read sensor #1
  anVolt = analogRead(anPin1);
  mm1 = anVolt * 5; //try 1.8 instead of 5 if running at 1.8 volts
  front_sensor = mm1/25.4; //converts raw distance to inches from millimeter

  if(front_sensor <= 10){
      front = HIGH;
    }else{
        front = LOW;
      }

  //read sensor #2
  anVolt = analogRead(anPin2);
  mm2 = anVolt * 5; //try 1.8 instead of 5 if running at 1.8 volts
  right_sensor = mm2/25.4; //converts raw distance to inches from millimeter

  if(right_sensor <= 10){
      right = HIGH;
    }else{
        right = LOW;
      }

  //read sensor #3
  anVolt = analogRead(anPin3);
  mm3 = anVolt * 5; //try 1.8 instead of 5 if running at 1.8 volts
  left_sensor = mm3/25.4; //converts raw distance to inches from millimeter

  if(left_sensor <= 10){
      left = HIGH;
    }else{
        left = LOW;
      }
  
}

void print_range(){

  Serial.print("Front = ");
  Serial.println(front);
  Serial.println(front_sensor);

  Serial.print("Right = ");
  Serial.println(right);
  Serial.println(right_sensor);

  Serial.print("Left = ");
  Serial.println(left);
  Serial.println(left_sensor);

  /*
  Serial.print("S1");
  Serial.print("=");
  Serial.print(mm);
  Serial.print(" ");
  Serial.println(inches);
  */
}

void loop() {
  read_sensor();
  print_range();
  delay(100);
}
