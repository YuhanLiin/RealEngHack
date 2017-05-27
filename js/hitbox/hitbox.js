function Hitbox(x, y, width, height, dmg){
    var box = Object.create(Hitbox.prototype);
    box.x = x;
    box.y = y;
    box. width = width;
    box.height = height;
    box.damage = dmg;
    return box; 
}

Hitbox.prototype = {
    function collide(char){
        return this.isActive && Math.abs(char.x - this.x) < (char.width + this.width)/2 
        && Math.abs(char.y - this.y) < (char.height + this.height)/2;
    },
    function onHit(char){
        char.isAlive = false;
    }
    function checkHit(char){
        if this.collide(char){
            this.onHit(char);
        }
    }
};

module.exports = Hitbox;