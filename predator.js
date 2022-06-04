class Predator extends LivingCreature{
    constructor(x, y) {
        super(x,y);
        this.energy = 17
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


mul() {
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);
    var emptyCells1 = this.chooseCell(4);
    var newCell1 = random(emptyCells1);

  
     if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 3;

        var newpredatorArr = new Predator(newX, newY);
        predatorArr.push(newpredatorArr);
        this.energy = 17
    }  else if (newCell1) {
        var newX = newCell1[0];
        var newY = newCell1[1];
        matrix[newY][newX] = 4;

        var newpredatorArr = new Predator(newX, newY);
        predatorArr.push(newpredatorArr);
        this.energy = 17
    }

}
move() {
    this.energy--
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);
    if(newCell && this.energy >= 0) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x] ///kam 2 tiv@
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
    } else {
        this.die()
    }
}
eat() {
    var emptyCells = this.chooseCell(2);
    var newCell = random(emptyCells);
    var emptyCells1 = this.chooseCell(4);
    var newCell1 = random(emptyCells1);
    var emptyCells2 = this.chooseCell(5);
    var newCell2 = random(emptyCells2);
    if (newCell2){
        this.die()
    }
  
  
    else if(newCell) {
        this.energy++
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x] ///kam 2 tiv@
        matrix[this.y][this.x] = 0
        this.x = newX
        this.y = newY
        for (var i in grassEaterArr) {
            if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            } 
        }
       
       } else if(newCell1) {
        this.energy+=20
        var newX = newCell1[0];
        var newY = newCell1[1];
         matrix[newY][newX] = 0 ///kam 2 tiv@
        
        this.x = newX
        this.y = newY
        for (var i in energyArr) {
            if (newX == energyArr[i].x && newY == energyArr[i].y) {
                energyArr.splice(i, 1);
                break;
            }
        }
       
      } if (this.energy >= 18) {
        this.mul()
    } 
       else {
          this.move()
      } 
    
}
die() {
    matrix[this.y][this.x] = 0
    for (var i in predatorArr) {
        if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
            predatorArr.splice(i, 1);
            break;
        }
    }
}

}