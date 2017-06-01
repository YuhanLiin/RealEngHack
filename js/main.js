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

