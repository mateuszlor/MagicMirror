#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

#define TRIGGER 5
#define ECHO    4

const char* ssid     = "K7.NET";
const char* password = "mateuszlor";

ESP8266WebServer server(80);

void handle_root() {
  server.send(200, "text/plain", "Hello from the esp8266, read from /distance");
  delay(100);
}

void setup() 
{ 
  Serial.begin (9600);
  pinMode(TRIGGER, OUTPUT);
  pinMode(ECHO, INPUT);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.println("MagicMirror distance service");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/", handle_root);

  server.on("/distance", [](){  // if you add this subdirectory to your webserver call, you get text below :)
    Serial.println("Entering /distance");
    long distance = readDistance();       // read sensor

    bool isValid = true;

    if(distance == 999)
    {
      isValid = false;
    }
    
    String webString = "{ \"distance\": ";
    webString += distance;
    webString += ", \"isValid\": ";
    webString += isValid;
    webString += " }";
    server.send(200, "application/json", webString);            // send to someones browser when asked
  });
  
  server.begin();
  Serial.println("HTTP server started");
}

void loop()
{ 
  server.handleClient();
}

long readDistance()
{
  long duration; 
  long distance;
  long distanceSum = 0;
  long distanceResult;
  long attempts = 5;
  bool isValid = true;  

  for(int i = 0; i < attempts && isValid; i++)
  {  
    digitalWrite(TRIGGER, LOW);  
    delayMicroseconds(2);   
    digitalWrite(TRIGGER, HIGH);
    delayMicroseconds(10); 
    
    digitalWrite(TRIGGER, LOW);
    duration = pulseIn(ECHO, HIGH);
    distance = (duration/2) / 29.1;
    Serial.print(distance);
    Serial.print(", ");
    if(distance > 400 )
    {
      isValid = false;
      continue;
    }
    distanceSum += distance;
    delay(10);
  }

  Serial.println();
  Serial.print("Centimeter:");
  if(isValid)
  {
    distanceResult = distanceSum / attempts;
  }
  else
  {
    distanceResult = 999;
  }
  Serial.println(distanceResult);
  return distanceResult;
}

