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