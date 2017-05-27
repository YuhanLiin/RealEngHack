(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
var Character = require("./character.js");
var Player = require("./player.js");

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
    game.runFrame = function(){
        game.player.receiveInputs(game.controls);
        game.player.frameProcess();
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
},{"./character.js":1,"./player.js":4}],3:[function(require,module,exports){
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
            if (tickFrames > 50){
                console.log("frame dump");
                delta = 0;
            }
        }
        view.drawGame(game);
        requestAnimationFrame(tick);
    }

    tick();
});


},{"./game.js":2,"./viewEngine.js":5}],4:[function(require,module,exports){
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
},{"./character.js":1}],5:[function(require,module,exports){
var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');

function drawGame(game){
    drawPlayer(game.player);
    //Draw other shit
}

var bg = document.getElementById('bg');
function eraseGame(game){
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
}

var playerSprites = [document.getElementById('player1'), document.getElementById('player2')];
var drawPlayer = function(){
    var iteration = 0;
    var duration = 10
    return function (player){
        //x2 width to compensate for the gun
        ctx.drawImage(playerSprites[Math.floor(iteration/duration)], player.x-player.width/2, 
            player.y-player.height/2, player.width*2, player.height);
        if (player.velx != 0 || player.vely != 0) iteration++;
        if(iteration >= playerSprites.length*duration) iteration = 0;
    }
}()

module.exports = {eraseGame: eraseGame, drawGame: drawGame};
},{}]},{},[3]);
