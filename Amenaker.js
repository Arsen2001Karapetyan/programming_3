class Hska extends LivingCreature {
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x - 3, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
            [this.x - 3, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 3, this.y + 3]
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
            matrix[newCell[1]][newCell[0]] = 5;
            this.x = newCell[0];
            this.y = newCell[1];
            if (this.energy <= 0) {
                for (var i in hska) {
                    if (hska[i].x == this.x && hska[i].y == this.y) {
                        hska.splice(i, 1);
                        matrix[this.y][this.x] = 0;
                        break;
                    }
                }
            } else {
                this.energy--
            };
        }
    }

    eat() {
        this.getNewCoordinates();
        var emptyCells = this.chooseCell(4);
        var newCell = random(emptyCells);
        if (newCell) {

            matrix[this.y][this.x] = 0;
            matrix[newCell[1]][newCell[0]] = 5;
            this.x = newCell[0];
            this.y = newCell[1];
            if (this.energy < 0) {
                for (var i in mah) {
                    if (mah[i].x == this.x && mah[i].y == this.y) {
                        mah.splice(i, 1);
                        break;
                    }
                }
            }
            if (this.energy == 7) {
                hska.push(new Hska(this.x, this.y));
            } else {
                this.energy++
            };

        } else {
            this.move();
        }

    }
}