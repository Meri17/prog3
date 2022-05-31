class Energy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 17
        this.directions = [];
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

chooseCell(character) {
    this.getNewCoordinates()
    var found = [];
    for (var i in this.directions) {
        var x = this.directions[i][0];
        var y = this.directions[i][1];
       

        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            if (matrix[y][x] == character) {
                found.push(this.directions[i]);
            }
        }
    }

    return found;
}
mul() {
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 3;

        var newenergyArr = new Energy(newX, newY);
        energyArr.push(newenergyArr);
        this.energy = 17
    }
}
die() {
    matrix[this.y][this.x] = 0
    for (var i in energyArr) {
        if (this.x == energyArr[i].x && this.y == energyArr[i].y) {
            energyArr.splice(i, 1);
            break;
        }
    }
}

}