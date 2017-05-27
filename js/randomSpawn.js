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