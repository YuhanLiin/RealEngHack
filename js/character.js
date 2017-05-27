function Character(game, x, y){
    var char = Object.create(Character.prototype);
    char.x = x;
    char.y = y;
    char.baseSpeed = 5;
    char.velx = 0;
    char.vely = 0;
    char.facing = 1;
    char.width = 40;
    char.height = 50;
    char.game = game;
    return char;
}

Character.prototype = {
    turnLeft(){
        this.velx = -this.baseSpeed;
        this.vely = 0;
    },
    turnRight(){
        this.velx = this.baseSpeed;
        this.vely = 0;
    },
    turnUp(){
        this.vely = -this.baseSpeed;
        this.velx = 0;
    },
    turnDown(){
        this.vely = this.baseSpeed;
        this.velx = 0;
    },
    stop(){
        this.velx = 0;
        this.vely = 0;
    },
    move(){
        this.x += this.velx;
        this.y += this.vely;
        if (this.x < this.width/2){
            this.x = this.width/2;
        }
        if (this.y < this.height/2){
            this.y = this.height/2;
        }
        if (this.x > this.game.width - this.width/2){
            this.x = this.game.width - this.width/2;
        }
        if (this.y > this.game.height - this.height/2){
            this.y = this.game.height - this.height/2;
        }
    },
    frameProcess(){
        this.move();
    }
}

module.exports = Character;