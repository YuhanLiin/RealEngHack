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

    game.runFrame = function(){
        game.enemyAttacks = [], game.playerAttacks = [];
        game.player.receiveInputs(game.controls);
        game.player.frameProcess();
        game.enemies.forEach(enemy=>{
            enemy.aiDecision(game.player);
            enemy.frameProcess();
        });
        if (game.frameCount % (60*4) === 0){
            //game.enemies.push(randomSpawn(game,Newton));
        }
        game.playerAttacks.forEach(atk=>{
            game.enemies.forEach(enemy=>atk.checkHit(enemy));

        });
        game.enemyAttacks.forEach(atk=>atk.checkHit(game.player))
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