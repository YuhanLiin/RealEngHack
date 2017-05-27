var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');

function drawGame(game){
    drawPlayer(game.player);
    game.enemies.forEach(drawEnemy);

    ctx.fillStyle='red';
    ctx.globalAlpha = 0.2;
    drawHitbox(game.player);
    ctx.globalAlpha = 1;
    //Draw other shit
}

var bg = document.getElementById('bg');
function eraseGame(game){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
}

var playerSpritesHori = [document.getElementById('player1'), document.getElementById('player2')];
var playerSpritesVert = [document.getElementById('player3'), document.getElementById('player4')];
var drawPlayer = function(){
    var iteration = 0;
    var duration = 10
    return function (player){
        //x2 width to compensate for the gun
        var sprites;
        if (player.vely != 0) sprites = playerSpritesVert;
        else sprites = playerSpritesHori;
        ctx.drawImage(sprites[Math.floor(iteration/duration)], player.x-player.width/2, 
            player.y-player.height/2, player.width*1.8, player.height);
        if (player.velx != 0 || player.vely != 0) iteration++;
        if(iteration >= 2*duration) iteration = 0;
    }
}();

function drawEnemy(enemy){
    drawNewton(enemy);
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