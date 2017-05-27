function Character(game, x, y){
    var char = Object.create(Character.prototype);
    char.x = x;
    char.y = y;
    char.velx = 0;
    char.vely = 0;
<<<<<<< HEAD
    char.facing = 1;
    char.atkFrame = 0;
=======
    char.facing = 1; //1 is right, -1 is left
>>>>>>> 1e67196c09980ac17bf729d5182b81a1f21a30f4
    char.game = game;
    char.isAlive = true;
    return char;
}

Character.prototype = {
    baseSpeed: 5,
    width: 40,
    height: 50,
    turnLeft(){
        this.velx = -this.baseSpeed;
        this.vely = 0;
        this.facing = -1;
    },
    turnRight(){
        this.velx = this.baseSpeed;
        this.vely = 0;
        this.facing = 1;
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
        this.facing = 1;
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
    attack(){
        if (atkFrame === 0){
            atkFrame++;
        }
    },
    frameProcess(){
        if (atkFrame > 0){
            atkFrame++;
            this._attackProcess();
        }
        else{
            this.move();
        }
    }
}

module.exports = Character;