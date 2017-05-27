var canvas = document.getElementById('screen');
var ctx = canvas.getContext('2d');

function drawGame(game){
    drawPlayer(game.player);
    game.enemies.forEach(drawEnemy);

    ctx.globalAlpha = 0.2;
    ctx.fillStyle='yellow';
    drawHitbox(game.player);
    game.enemies.forEach(drawHitbox);
    ctx.fillStyle='red';
    game.enemyAttacks.forEach(drawHitbox);
    game.playerAttacks.forEach(drawHitbox);
    ctx.globalAlpha = 1;
    

}

var bg = document.getElementById('bg');
function eraseGame(game){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
}

var playerSpritesHori = [document.getElementById('player2Right'),
                        document.getElementById('player1'),
                        document.getElementById('player1Left'),
                         document.getElementById('player2Left')];

var playerSpritesVert = [document.getElementById('player3Right'),
                         document.getElementById('player4Right'),
                         document.getElementById('player3Left'),
                         document.getElementById('player4Left')];

var drawPlayer = function(){
    var iteration = 0;
    var duration = 10
    return function (player){
        //x2 width to compensate for the gun
        var sprites;
        if (player.vely != 0) sprites = playerSpritesVert;
        else sprites = playerSpritesHori;
        
        if (player.facing === 1) { //If facing right
            ctx.drawImage(sprites[Math.floor(iteration/duration)], player.x-player.width/2, 
            player.y-player.height/2, player.width*1.8, player.height);
        }
        
        else if (player.facing === -1) { //If facing left
            ctx.drawImage(sprites[Math.ceil(Math.floor(iteration/duration)+2)], player.x-player.width/2-player.width*0.8, 
            player.y-player.height/2, player.width*1.8, player.height);
        }
        
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