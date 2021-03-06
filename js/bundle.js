(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Character(game, x, y){
    var char = Object.create(Character.prototype);
    char.x = x;
    char.y = y;
    char.velx = 0;
    char.vely = 0;
    char.facing = 1;
    char.atkFrame = 0;
    char.game = game;
    char.hp = char.maxHp;
    return char;
}

Character.prototype = {
    baseSpeed: 5,
    width: 40,
    height: 50,
    maxHp: 20,
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
        if (this.atkFrame === 0){
            this.atkFrame++;
        }
    },
    frameProcess(){
        if (this.atkFrame > 0){
            this.atkFrame++;
            this._attackProcess();
        }
        this.move();
    }
}

module.exports = Character;
},{}],2:[function(require,module,exports){
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
    maxHp: 4,
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
            this.game.enemyAttacks.push(Hitbox(this.x, this.y+10, this.width, this.height/2, 1));
        }
        else if (this.atkFrame === 10){
            this.atkFrame = 0;
        }
    }
});

module.exports = Newton;
},{"../character.js":1,"../hitbox/hitbox.js":4}],3:[function(require,module,exports){
var Character = require("./character.js");
var Player = require("./player.js");
var Newton = require("./enemies/newton.js");

var randomSpawn = require("./randomSpawn.js");

function Game(){
    var game = {};
    game.width = 800;
    game.height = 600;
    game.frameCount = 0;
    game.player = Player(game, 400, 300);
    game.controls = {dir: 'i', dash:'i', attack:'i'};
    game.enemies = [];
    game.playerAttacks = [];
    game.enemyAttacks = [];
    game.isDone = false;

    game.runFrame = function(){
        game.enemyAttacks = [], game.playerAttacks = [];
        game.player.receiveInputs(game.controls);
        game.player.frameProcess();
        game.enemies.forEach(enemy=>{
            enemy.aiDecision(game.player);
            enemy.frameProcess();
        });
        if (game.state != "dead"){
            if (game.frameCount % (60*4) === 0){
                game.enemies.push(randomSpawn(game,Newton));
            }
        }
        //Do hit check b4 death check
        for (let i = 0; i<game.enemies.length; i++){
            let enemy = game.enemies[i];
            game.playerAttacks.forEach(atk=>atk.checkHit(enemy));
            if (enemy.hp <= 0){
                game.enemies.shift(i, 1);
                i--;
            }
        }

        game.enemyAttacks.forEach(atk=>atk.checkHit(game.player))
        if (game.player.hp <= 0){
            game.isDone = true;
        }
        game.frameCount++;
    };

    game.onPress = function(keyCode){
        console.log(keyCode);
        switch(keyCode){
            case 87:
                game.controls.dir = 'u';
                break;
            case 83:
                game.controls.dir = 'd';
                break;
            case 65:
                game.controls.dir = 'l';
                break;
            case 68:
                game.controls.dir = 'r';
                break;
            case 80:
                game.controls.dash = 'p';
                break;
            case 79:
                game.controls.attack = 'o';
                break;
        }
    }

    game.onRelease = function(keyCode){
        switch(keyCode){
            case 87:
                if (game.controls.dir == 'u') game.controls.dir = 'i';
                break;
            case 83:
                if (game.controls.dir == 'd') game.controls.dir = 'i';
                break;
            case 65:
                if (game.controls.dir == 'l') game.controls.dir = 'i';    
                break;
            case 68:
                if (game.controls.dir == 'r') game.controls.dir = 'i';
                break;
            case 80:
                if (game.controls.dash == 'p') game.controls.dash = 'i';
                break;
            case 79:
                if (game.controls.attack == 'o') game.controls.attack = 'i';
                break;
        }
    }
    return game;
}

module.exports = Game;
},{"./character.js":1,"./enemies/newton.js":2,"./player.js":6,"./randomSpawn.js":7}],4:[function(require,module,exports){
function Hitbox(x, y, width, height, dmg){
    var box = Object.create(Hitbox.prototype);
    box.x = x;
    box.y = y;
    box. width = width;
    box.height = height;
    box.damage = dmg;
    return box; 
}

Hitbox.prototype = {
    collide(char){
        return Math.abs(char.x - this.x) < (char.width + this.width)/2 
        && Math.abs(char.y - this.y) < (char.height + this.height)/2;
    },
    onHit(char){
        char.hp -= this.damage;
        console.log(this.dmg, char.hp)
    },
    checkHit(char){
        if (this.collide(char)){
            this.onHit(char);
        }
    }
};

module.exports = Hitbox;
},{}],5:[function(require,module,exports){
$(document).ready(function(){
    var Game = require("./game.js");
    var view = require("./viewEngine.js");

    var game = Game();
    $('body').keydown(function(e){game.onPress(e.which)});
    $('body').keyup(function(e){game.onRelease(e.which)});

    var frameTime = 1000/60;
    var delta = 0;
    var then = Date.now();

    function tick(){
        var now = Date.now();
        delta = now - then;
        then = now;
        view.eraseGame(game);
        for (let tickFrames = 0; delta >= frameTime; delta -= frameTime, tickFrames++){
            game.runFrame();
            if (game.isDone) break;
            if (tickFrames > 50){
                console.log("frame dump");
                delta = 0;
            }
        }
        view.drawGame(game);
        if (!game.isDone) requestAnimationFrame(tick);
    }

    tick();
});


},{"./game.js":3,"./viewEngine.js":8}],6:[function(require,module,exports){
var Character = require("./character.js");
var Hitbox = require("./hitbox/hitbox.js")

function Player(game, x, y){
    var char = Character(game, x, y);
    char.maxHp = 20;
    char.hp = char.maxHp;
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
            this.game.playerAttacks.push(Hitbox(this.x+(this.width/2+20)*this.facing, this.y-20, 35, 20, 4));
        }
        else if (this.atkFrame === 15){
            this.atkFrame = 0;
        }
    }
    return char;
}

module.exports = Player;
},{"./character.js":1,"./hitbox/hitbox.js":4}],7:[function(require,module,exports){
function randomSpawn(game, enemyFactory){
    var width = enemyFactory.prototype.width;
    var height = enemyFactory.prototype.height;
    var rand = Math.random();
    var x, y;
    var rx = Math.random()*game.width;
    var ry = Math.random()*game.height;
    if (rand < 0.3){
        //top spawn
        y = -height;
        x = rx;
    }
    else if (rand < 0.6){
        //bottom spawn
        y = game.height + height;
        x = rx;
    }
    else if (rand < 0.8){
        //left spawn
        y = ry;
        x = -width;
    }
    else{
        //right spawn
        y = ry;
        x = game.width + width;
    }
    return enemyFactory(game, x, y);
}

module.exports = randomSpawn;
},{}],8:[function(require,module,exports){
var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');

var hitboxCache = [];
function showBoxes(game){
    ctx.globalAlpha = 0.2;
    ctx.fillStyle='yellow';
    drawHitbox(game.player);
    game.enemies.forEach(drawHitbox);
    ctx.fillStyle='red';
    for (let i=0; i<hitboxCache.length; i++){
        var pair = hitboxCache[i];
        drawHitbox(pair[0]);
        pair[1] -= 1;
        if (pair[1] === 0){
            hitboxCache.splice(i);
            i--;
        }
    }
    game.enemyAttacks.forEach(atk=>hitboxCache.push([atk,10]));
    game.playerAttacks.forEach(atk=>hitboxCache.push([atk,10]));
    ctx.globalAlpha = 1;
}

function drawGame(game){
    drawGameState(game);
    //debug
    showBoxes(game);
    if (game.isDone){
        drawDeath(game);
    }
}

function drawGameState(game){
    drawPlayer(game.player);
    game.enemies.forEach(drawEnemy);
}

var rip = document.getElementById('rip');
function drawDeath (game){
    var frameCount = 0;
    var endFrame = 5*60;
    var fadedAlpha = 1;
    var lastGameFrame = new Image();
    lastGameFrame.src = canvas.toDataURL();
    function drawBgRect(){
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgb(51, 51, 51)"
        ctx.fillRect(0,0,canvas.width, canvas.height);
    }
    function frame(){
        if (frameCount < 5*60){
            drawBgRect();
            ctx.globalAlpha = fadedAlpha;
            fadedAlpha -= 1/5/60;
            ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(lastGameFrame, 0, 0, canvas.width, canvas.height);
        }

        if (frameCount <= endFrame) requestAnimationFrame(frame);
        else drawBgRect();
        frameCount++;
    }
    requestAnimationFrame(frame);
}

var bg = document.getElementById('bg');
function eraseGame(game){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
}

function flip(img){
    var canvas = document.createElement('canvas');
    canvas.height = img.height, canvas.width = img.width;
    var ctx = canvas.getContext('2d');
    ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0, -img.width, img.height);
    var flipped = new Image();
    flipped.src = canvas.toDataURL();
    return flipped;
}

function drawBar(maxVal, curVal, x, y, width, height, color){
    curVal = Math.max(curVal, 0);
    ctx.fillStyle = 'black';
    ctx.fillRect(x-width/2, y-height/2, width, height);
    width -= 0.2*height, height -= 0.2*height;
    ctx.fillStyle = color;
    ctx.fillRect(x-width/2, y-height/2, width*curVal/maxVal, height);
}

var playerSpritesHori = [[document.getElementById('player2Right'),
                        document.getElementById('player1')]];
playerSpritesHori.push(playerSpritesHori[0].map(flip));
var playerSpritesVert = [[document.getElementById('player3Right'),
                         document.getElementById('player4Right')]];
playerSpritesVert.push(playerSpritesVert[0].map(flip));
var playerAttackSprites = [[playerSpritesHori[0][0],
                            document.getElementById('playerAttack2Right'),
                            document.getElementById('playerAttack3Right')]];
playerAttackSprites.push(playerAttackSprites[0].map(flip));
var drawPlayer = function(){
    var iteration = 0;
    var duration = 10
    return function (player){
        //x2 width to compensate for the gun
        var sprites, index;
        if (player.atkFrame > 0 ) {sprites = playerAttackSprites; index = Math.floor(player.atkFrame/5);}
        else if (player.vely != 0) {sprites = playerSpritesVert; index = Math.floor(iteration/duration);}
        else {sprites = playerSpritesHori; index = Math.floor(iteration/duration);}
        
        if (player.facing === 1) { //If facing right
            ctx.drawImage(sprites[0][index], player.x-player.width/2, 
            player.y-player.height/2, player.width*1.8, player.height);
        }
        
        else if (player.facing === -1) { //If facing left
            ctx.drawImage(sprites[1][index], player.x-player.width/2-player.width*0.8, 
            player.y-player.height/2, player.width*1.8, player.height);
        }

        drawBar(player.maxHp, player.hp, player.x, player.y - 30, 40, 10, 'red');
        
        if (player.velx != 0 || player.vely != 0) iteration++;
        if(iteration >= 2*duration) iteration = 0;
    }
}();

function drawEnemy(enemy){
    drawNewton(enemy);
    drawBar(enemy.maxHp, enemy.hp, enemy.x, enemy.y - 30, 40, 10, 'red');
}

var newtonSpritesHori = [document.getElementById('newton1'), document.getElementById('newton2')];
var newtonSpritesVert = [document.getElementById('newton4'), document.getElementById('newton3')];
var drawNewton = function(){
    var iteration = 0;
    var duration = 10;
    return function(newton){
        var sprites;
        if (newton.vely != 0) sprites = newtonSpritesVert;
        else sprites = newtonSpritesHori;
        ctx.drawImage(sprites[Math.floor(iteration/duration)], newton.x-newton.width, 
            newton.y-newton.height/2, newton.width*2, newton.height);
        if (newton.velx != 0 || newton.vely != 0) iteration++;
        if(iteration >= 2*duration) iteration = 0;
    }
}();

function drawHitbox(hitbox){
    ctx.fillRect(hitbox.x-hitbox.width/2, 
            hitbox.y-hitbox.height/2, hitbox.width, hitbox.height);
}

module.exports = {eraseGame: eraseGame, drawGame: drawGame};
},{}]},{},[5]);
