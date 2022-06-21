var socket = io();
var weath = 'winter'
var side = 30;
function setup() {
    frameRate(4);
    createCanvas(20 * side,20 * side);
    background('#acacac');

    
}


function paint(matrix) {

    socket.on("weather", function (data) {
        weath = data; 
       
        if (weath == "spring") {
            document.body.style.backgroundColor = "#FFEF82";
            document.getElementById("weather").textContent = "Գարուն";
            document.getElementById("weather").style.color = "#FF7800";
           
           

        }
        else if (weath == "summer") {
            document.body.style.backgroundColor = "#4AA96C";
            document.getElementById("weather").textContent = "Ամառ";
            document.getElementById("weather").style.color = "black";

        }
        
        else if (weath == "autumn") {
            document.body.style.backgroundColor = "#CC9544";
            document.getElementById("weather").textContent = "Աշուն";
            document.getElementById("weather").style.color = "#8E3200";
        }

        else if (weath == "winter") {
            document.body.style.backgroundColor = "#001E6C";
            document.getElementById("weather").textContent = "Ձմեռ";
            document.getElementById("weather").style.color = "#00B4D8";
        }
       
    })

      for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if(weath == "spring")
                {
                    fill("#F10086")
                
                }
                else if(weath == "summer")
                {
                    fill("#3EC70B");
                }
                else if(weath == "winter")
                {
                    fill("white")
                }
                else if(weath == "autumn")
                {
                    fill("#EC9B3B")
                }
                rect(x * side, y * side, side, side);
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
socket.on("weather", function (data)
    {
        weath = data;
    })
function kill() {
    socket.emit("kill")
}
function grassEater() {
    socket.emit("xotaker")
}
function magicHall() {
    socket.emit("magichall")
}
function predator() {
    socket.emit("predator")
}
function grass() {
    socket.emit("xot")
}









