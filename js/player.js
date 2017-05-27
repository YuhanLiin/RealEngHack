var Character = require("./character.js");
var Hitbox = require("./hitbox/hitbox.js")

function Player(game, x, y){
    var char = Character(game, x, y);
    char.receiveInputs = function(controls){
        switch(controls.dir){
            case 'i':
                this.stop();
                break;
            case 'u':
                this.turnUp();
                break;
            case 'd':
                this.turnDown();
                break;
            case 'l':
                this.turnLeft();
                break;
            case 'r':
                this.turnRight();
                break;
        }
        if (controls.attack != 'i') this.attack();
    },
    char._attackProcess = function(){
        if (this.atkFrame === 10){
            this.game.playerAttacks.push(Hitbox(this.x+(this.width/2+20)*this.facing, this.y-20, 40, 10));
        }
        else if (this.atkFrame === 15){
            this.atkFrame = 0;
        }
    }
    return char;
}

module.exports = Player;