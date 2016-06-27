#!/usr/bin/python

import bluetooth
import time
import web

urls = (
    '/discover', 'discover',
    '/one', 'get_one'
)

app = web.application(urls, globals())

class discover:        
    def GET(self):
        web.header("Access-Control-Allow-Origin", "*");
        try:
            nearby_devices = bluetooth.discover_devices(lookup_names = True)
            output = '[';
            for device in nearby_devices:
                print "Found device with address: ",  device[0], " and name: ", device[1]
                output += "{\"address\":\"" + device[0] + "\", \"name\": \"" + device[1] + "\"},"
            output = output[:-1];
            output += ']';
            return output
        except Exception, e:
            print "Unexpected error: ", e
            return "ERROR"

class get_one:
    def GET(self):
        try:
            nearby_devices = bluetooth.discover_devices(lookup_names = True)
            output = '[';
            for device in nearby_devices:
                print "Found device with address: ",  device[0], " and name: ", device[1]
                output += "{\"address\":\"" + device[0] + "\", \"name\": \"" + device[1] + "\"},"
            output += ']';
            return output
        except Exception, e:
            print "Unexpected error: ", e
            return "ERROR"

if __name__ == "__main__":
    app.run()

