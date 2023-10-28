var LivingCreature = require("./LivingCreature");
var random = require("./random");

module.exports = class Fish extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 5;
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
            matrix[newCell[1]][newCell[0]] = 6;
            this.x = newCell[0];
            this.y = newCell[1];
            if (this.energy == 0) {
                for (var i in fsh) {
                    if (fsh[i].x == this.x && fsh[i].y == this.y) {
                        fsh.splice(i, 1);
                        matrix[this.y][this.x] = 0;
                        break;
                    }
                }
            } else {
                this.energy--
            };
        }
    }

    getwet() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(2);
        var newCell = random(emptyCells);
        if (newCell) {

            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 3;
            this.x = newCell[0];
            this.y = newCell[1];
            if (this.energy < 0) {
                for (var i in GrassEat) {
                    if (GrassEat[i].x == this.x && GrassEat[i].y == this.y) {
                        GrassEat.splice(i, 1);
                        break;
                    }
                }
            }
            if (this.energy == 7) {
                fsh.push(new Fish(this.x, this.y));
            } else {
                this.energy++
            };

        } else {
            this.move();
        }
    }
}