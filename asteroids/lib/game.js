var Asteroid = require('./asteroid');
module.exports = Game;

function Game() {
  this.ASTEROIDS = [];
  this.addAsteroids();
}

Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.NUM_ASTEROIDS = 10;

// Game.DIM_X = 500;
// Game.DIM_Y = 500;
// Game.NUM_ASTEROIDS = 5;
// Game.ASTEROIDS = [];

Game.prototype.step = function(){
  this.checkCollisions();
  this.moveObjects();
};

Game.prototype.remove = function(asteroid){

  if (asteroid instanceof Asteroid){
    let idx = this.ASTEROIDS.indexOf(asteroid);
    if (idx>-1){
      console.log("here");
      this.ASTEROIDS.splice(idx, 1);
    }
  }else{
  }
};

Game.prototype.addAsteroids = function() {
  for(var i = 0; i < Game.NUM_ASTEROIDS; i++){
    this.ASTEROIDS.push(new Asteroid({pos: this.randomPosition(), game: this})) ;
  }
  return this.ASTEROIDS;
};

Game.prototype.randomPosition = function() {
  return [Math.random()*500, Math.random()*500];
};


Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, 500, 500); //?????????
  this.ASTEROIDS.forEach(function(asteroid) {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.ASTEROIDS.forEach(function(asteroid) {
    asteroid.move();
  });
};

Game.prototype.wrap = function(pos) {
  if (pos[0] >= Game.DIM_X) {
    pos[0] = 0;
  } else if (pos[0] <= 0) {
    pos[0] = Game.DIM_X;
  } else if (pos[1] >= Game.DIM_Y) {
    pos[1] = 0;
  } else if (pos[1] <= 0) {
    pos[1] = Game.DIM_Y;
  }
  return pos;
};

Game.prototype.checkCollisions = function() {
  for (var i = 0; i < this.ASTEROIDS.length; i++) {
    for (var j = i + 1; j < this.ASTEROIDS.length; j++) {
      if (this.ASTEROIDS[i].isCollidedWith(this.ASTEROIDS[j])) {
        let asteroid1 = this.ASTEROIDS[i];
        let asteroid2 = this.ASTEROIDS[j];
        this.remove(asteroid1);
        this.remove(asteroid2);
      }
    }
  }
};

//
// let game = new Game();
// game.addAsteroids();
// // console.log(Game.ASTEROIDS);
// console.log(game.ASTEROIDS);
