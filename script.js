var socket = io();

var side = 30;
function setup() {
    frameRate(4);
    createCanvas(20 * side,20 * side);
    background('#acacac');

    
}
function paint(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            else if (matrix[y][x] == 6) {
                fill("purple");
            }
           

            rect(x * side, y * side, side, side);


        }
    }

  

}
setInterval(
    function () {
    socket.on('send matrix', paint)
    },1000
)













