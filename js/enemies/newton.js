var Character = require("../character.js");

function Newton(game, x, y){
    var char = Object.assign(Object.create(Newton.prototype), Character(game, x, y));
    return char;
}

Newton.prototype = Object.assign(Character.prototype, {
    baseSpeed : 3.5,
    width : 40,
    height : 50,
    aiDecision(player){
        var dx = player.x - this.x;
        var dy = player.y - this.y;
        if (Math.abs(dx) > Math.abs(dy)){
            if (dx > 0){
                this.turnRight();
            }
            else this.turnLeft();
        }
        else{
            if (dy > 0){
                this.turnDown();
            }
            else this.turnUp();
        }
        this.attack();
    },
    _attackProcess(){
        if (atkFrame === 5){
            this.game.enemyAttacks.push(Hitbox(this.x, this.y, this.width, this.height));
        }
        else if (atkFrame === 10){
            atkFrame = 0;
        }
    }
});

module.exports = Newton;