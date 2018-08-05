// Enemies our player must avoid

var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    //the x coordinate - starting from the left edge
    this.x = 0;
    //the y coordinate
    this.y = y;
    //the enemy's speed
    this.speed = Math.random() * 100 + 100;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //reseting the position of enemy, so they keep going all the time
    this.x > 505 ? this.x = 0: this.x;
};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-boy.png';
    //players coordinates:
    this.x = 200;
    this.y = 415;
    //step length, basen on engine.js, lin 137
    this.yStep = 83;
    this.xStep = 101;
};

Player.prototype.update = function(dt) {
  var thePl = this;
  allEnemies.forEach(function (el) {
    var enemyX = Number(el.x.toFixed());
    var enemyY = el.y;
    if (thePl.y === enemyY && (thePl.x  >= enemyX -80 && thePl.x < enemyX + 80)) {
      //if "eaten", goes back to
      thePl.x = 200;
      thePl.y = 415;
    };
  });
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {

    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    };

    if (keyPress == 'right' && this.x < 402) {
        this.x += 102;
    };

    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    };

    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    };

    if (this.y <= 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 800);
        alert("Congrats");
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var allEnemies =[new Enemy(83),new Enemy(166),new Enemy(249)];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});