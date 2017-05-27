var Character = require("./character.js");

function Player(game, x, y){
    var char = Character(game, x, y);
    char.receiveInputs = function(controls){
        console.log(controls)
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
    };
    return char;
}

module.exports = Player;