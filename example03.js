var http = require("http").createServer(handler);
var io = require("socket.io").listen(http);
var fs = require("fs");
var firmata = require("firmata");

var board = new firmata.Board("dev/ttyACM0", function() { 
    
    console.log("Connecting to Arduino");
    console.log("Activation of Pin 13");
    board.pinMode(13,board.MODES.OUTPUT);
})

function handler(req, res)
{
    fs.readFile(__dirname + "/examplexx.html", 
    function (err, data) {
        if (err)
        {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("Error loading html page.");
            
        }
        res.writeHead(200);
        res.end(data);
        
    });
}

http.listen(8080);
io.socket.on("connection", function(socket) {
    socket.on("commandToArduino", function(commandNo){
        if (commandNo == "1") {
        board.digitalWrite(13, board.HIGH);
    }
    if (commandNo == "0") {
        board.digitalWrite(13, board.LOW);
        }
});
});











