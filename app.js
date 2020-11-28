var tmi = require("tmi.js"),
    http = require('http'),
    dotenv = require('dotenv').config();

var commands = new Map();
commands.set('!hello', 'Hello World!');
// TODO: MOAR COMMANDS!

var options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: process.env.username,
        password: process.env.token
    },
    channels: ["KingBon3ss"]
}

var client = new tmi.client(options);
client.connect();

client.on("chat", function(channel, userstate, message, self){
    // TODO: check if user is an admin
    if(message.charAt(0) == '!'){
        var command = commands.get(message);
        if(command){
            client.say(channel, command);
        }
    }
});

client.on("hosted", function(channel, username, viewers){
    client.say(username + " is now hosting for " + viewers + " viewers. Thanks!");
});

var server = http.createServer(); 
server.listen(80);
