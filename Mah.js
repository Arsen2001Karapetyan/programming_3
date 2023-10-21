var LivingCreature = require("./LivingCreature");
var random = require("./random");

module.exports = class Mah extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 5;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 5, this.y - 5],
            [this.x, this.y - 5],
            [this.x + 5, this.y - 5],
            [this.x - 5, this.y],
            [this.x + 5, this.y],
            [this.x - 5, this.y + 5],
            [this.x, this.y + 5],
            [this.x + 5, this.y + 5]
        ];
    };

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    move() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {

            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 4;
            this.x = newCell[0];
            this.y = newCell[1];
            if (this.energy <= 0) {
                for (var i in mah) {
                    if (mah[i].x == this.x && mah[i].y == this.y) {
                        mah.splice(i, 1);
                        matrix[this.y][this.x] = 0;
                        break;
                    }
                }
            }
        }
        this.energy--;
    }

    eat() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(3);
        var newCell = random(emptyCells);
        if (newCell) {

            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 4;
            this.x = newCell[0];
            this.y = newCell[1];
            if (this.energy < 0) {
                for (var i in Pred) {
                    if (Pred[i].x == this.x && Pred[i].y == this.y) {
                        Pred.splice(i, 1);
                        break;
                    }
                }
            }
            this.energy++;
            if (this.energy >= 7) {
                mah.push(new Mah(this.x, this.y));
                this.energy = 2;
            }

        } else {
            this.move();
        }
    }
}