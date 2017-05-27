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