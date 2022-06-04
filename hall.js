class Hall extends LivingCreature{
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

    if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 3;

        var newhallArr = new Hall(newX, newY);
        hallArr.push(newhallArr);
        this.energy = 17
    }
}

}