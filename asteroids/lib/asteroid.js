var Util = require('./util');

var util = new Util();

var MovingObject = require('./moving_object');

// console.log(util);
// console.log(util.inherits);

function Asteroid(obj){
  this.pos = obj.pos;
  MovingObject.call(this, {radius: Asteroid.RADIUS, color: Asteroid.COLOR, vel: util.randomVec(Asteroid.RADIUS), pos: this.pos, game: obj.game });
}

util.inherits(Asteroid, MovingObject);
Asteroid.COLOR = 'red';
Asteroid.RADIUS = 10;

module.exports = Asteroid;

// let astr = new Asteroid ({ pos: [1,1]} );
// console.log(astr);
