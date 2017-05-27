var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');

function drawGame(game){
    drawPlayer(game.player);
    //Draw other shit
}

function eraseGame(game){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function drawPlayer(player){
    ctx.fillStyle = "Blue";
    ctx.fillRect(player.x-player.width/2, player.y-player.height/2, player.width, player.height);
}

module.exports = {eraseGame: eraseGame, drawGame: drawGame};