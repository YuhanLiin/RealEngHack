var Character = require("../character.js");
var Hitbox = require("../hitbox/hitbox.js")

function Newton(game, x, y){
    var char = Object.assign(Object.create(Newton.prototype), Character(game, x, y));
    char.hp = char.maxHp;
    return char;
}

Newton.prototype = Object.assign(Character.prototype, {
    baseSpeed : 3.5,
    width : 40,
    height : 50,
    maxHp: 10,
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
        if (this.atkFrame === 5){
            this.game.enemyAttacks.push(Hitbox(this.x, this.y+10, this.width, this.height/2, 2));
        }
        else if (this.atkFrame === 10){
            this.atkFrame = 0;
        }
    }
});

module.exports = Newton;