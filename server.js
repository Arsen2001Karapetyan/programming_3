var express = require("express");
var random = require("./random")
var LivingCreature = require("./LivingCreature");

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3001, function () {
    console.log("Example is running on port 3001");
});

var Grass = require("./Grass");
var GrassEater = require("./Grasseater");
var Predator = require("./Predator");
var Mah = require("./Mah");
var Amenaker = require("./Amenaker");

grassArr = [];
GrassEat = [];
Pred = [];
mah = [];
amen = [];
matrix = [];

var m = 50;
var sideX = 70;
var sideY = 35;
function CreateMatrix() {
    // for (var y = 0; y < m; y++) {
    //     matrix[y] = [];
    //     for (var x = 0; x < m; x++) {
    //         var n = Math.floor(Math.random() * 6);
    //         matrix[y][x] = n;
    //     }
    // }

    for (let i = 0; i < sideX; i++) {
        matrix.push([])
        for (let j = 0; j < sideY; j++) {
        matrix[i].push(0)
        }
        }
        
        function character(char, qantity) {
        for (let i = 0; i < qantity; i++) {
        var x = Math.floor(random(sideX));
        var y = Math.floor(random(sideY))
        matrix[x][y] = char;
        }
        }
        
        character(1, 400);
        character(2, 150);
        character(3, 1);
        character(4, 2);

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            } else if (matrix[y][x] == 2) {
                var ge = new GrassEater(x, y);
                GrassEat.push(ge);
            } else if (matrix[y][x] == 3) {
                var pr = new Predator(x, y);
                Pred.push(pr);
            } else if (matrix[y][x] == 4) {
                var mh = new Mah(x, y);
                mah.push(mh);
            } else if (matrix[y][x] == 5) {
                var amn = new Amenaker(x, y);
                amen.push(amn);
            }
        }
    }
}

CreateMatrix();

function PlayGame() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in GrassEat) {
        GrassEat[i].eat();
    }
    for (var i in Pred) {
        Pred[i].eat();
    }
    for (var i in mah) {
        mah[i].eat();
    }
    for (var i in amen) {
        amen[i].eat();
    }

    io.emit("MATRIX", matrix);
}

setInterval(function () {
    PlayGame();
}, 1000);

