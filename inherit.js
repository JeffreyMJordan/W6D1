
Function.prototype.inherits = function(superClass) {
  const Surrogate = function() {};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
  //this is the subclass;
};

function MovingObject () {}

function Ship () {}
Ship.inherits(MovingObject);
Ship.prototype.hello = function() {
  console.log("hello ship!");
};

console.log(Ship.prototype);
console.log(Ship.prototype.prototype);


const ship1 = new Ship;
console.log(ship1.hello);

function Asteroid () {}
Asteroid.inherits(MovingObject);
Asteroid.prototype.hello = function() {
  console.log("hello asteroid!");
};

const asteroid1 = new Asteroid;
console.log(asteroid1.hello);
