const LivingCreature = require("./LivingCreature");


module.exports = class MagicHall extends LivingCreature{
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
    chooseCell(ch){
        this.getNewCoordinates();
        return super.chooseCell(ch);
    }


mul() {
    var emptyCells = this.chooseCell(0);
    let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

    if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 3;

        var newmagicHallArr = new magicHall(newX, newY);
        magicHallArr.push(newmagicHallArr);
        this.energy = 17
    }
}
die() {
    matrix[this.y][this.x] = 0
    for (var i in magicHallArr) {
        if (this.x == magicHallArr[i].x && this.y == magicHallArr[i].y) {
            magicHallArr.splice(i, 1);
            break;
        }
    }
}
}