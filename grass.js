
const LivingCreature = require('./LivingCreature')

module.exports = class Grass extends LivingCreature{
    mul() {
        this.multiply++;
        let emptyCells = this.chooseCell(0)
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.multiply >=4 ) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
    eat() {
        var emptyCells = this.chooseCell(5);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell){
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassArr) {
            if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                grassArr.splice(i, 1);
                break;
            }
        }
    }
}