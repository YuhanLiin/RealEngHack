var Character = require("./character.js");
var Player = require("./player.js");
var Newton = require("./enemies/newton.js");

function Game(){
    var game = {};
    game.width = 800;
    game.height = 600;
    game.frameCount = 0;
    game.player = Player(game, 400, 300);
    game.controls = {dir: 'i', dash:'i', attack:'i'};
    game.enemies = [Newton(game, 100, 100)];
    game.playerAttacks = [];
    game.enemyAttacks = [];

    game.runFrame = function(){
        game.player.receiveInputs(game.controls);
        game.player.frameProcess();
        game.enemies.forEach(enemy=>{
            enemy.aiDecision(player);
            enemy.frameProcess();
        });
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