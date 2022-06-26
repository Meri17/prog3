var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");



app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


function generate(matLen, gr, grEat, pr, en, hall, mh) {
    let matrix = []
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < en; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    for (let i = 0; i < hall; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }
    for (let i = 0; i < mh; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6
        }
    }

    return matrix


}


matrix = generate(25, 10, 5, 10, 6, 3, 4)
io.sockets.emit('send matrix', matrix)

grassArr = []
grassEaterArr = []
predatorArr = []
energyArr = []
hallArr = []
magicHallArr = []
weath = "winter"
Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Energy = require('./energy')
Hall = require('./hall')
MagicHall = require('./magichall')
function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                predatorArr.push(gr)
            }
            else if (matrix[y][x] == 4) {
                let gr = new Energy(x, y)
                energyArr.push(gr)
            }
            else if (matrix[y][x] == 5) {
                let gr = new Hall(x, y)
                hallArr.push(gr)
            }
            else if (matrix[y][x] == 6) {
                let gr = new MagicHall(x, y)
                magicHallArr.push(gr)
            }

        }
    }

    io.sockets.emit('send matrix', matrix)
}

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

function game() {
    for (let i in grassArr) {
        grassArr[i].eat()
        if (grassArr[i] != 'undefined') {
            grassArr[i].mul()
        }
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()

    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    io.sockets.emit("send matrix", matrix);
}
setInterval(game, 900)
io.on('connection', function (socket) {
    createObject(matrix)
})
function kill() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    energyArr = [];
    hallArr = [];
    magicHallArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}
function magicHall() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 6
        magicHallArr.push(new MagicHall(x, y));
    }


}

function grassEater() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 2
        grassEaterArr.push(new GrassEater(x, y));
    }


}




function predator() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 3
        predatorArr.push(new Predator(x, y));
    }


}

function grass() {
    let x = Math.floor(Math.random() * 25)
    let y = Math.floor(Math.random() * 25)
    if (matrix[y][x] == 0) {
        matrix[y][x] = 1
        grassArr.push(new Grass(x, y));
    }


}


io.on('connection', function (socket) {
    createObject(matrix);
    socket.on("kill", kill);
    socket.on("xotaker", grassEater);
    socket.on("xot", grass);
    socket.on("predator", predator);
    socket.on("magichall", magicHall);

});