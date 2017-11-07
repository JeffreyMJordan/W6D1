/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var GameView = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("canvas");
  canvasEl.width = 500;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 500, 500);


  const view = new GameView(ctx);
  view.start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

 var Game = __webpack_require__(2);
module.exports = GameView;

function GameView(context){
  this.game = new Game();
  this.ctx = context;
  this.interval = 100;
}


GameView.prototype.start = function(){
  setInterval( () => {
    this.game.draw(this.ctx);
    this.game.step()
  }, this.interval);
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Asteroid = __webpack_require__(3);
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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(4);

var util = new Util();

var MovingObject = __webpack_require__(5);

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

function Util() {
  // Scale the length of a vector by the given amount.

}

Util.prototype.randomVec = function(length){
  const deg = 2 * Math.PI * Math.random();
  return this.scale([Math.sin(deg), Math.cos(deg)], length);
};

Util.prototype.scale = function(vec, m) {
  return [vec[0] * m, vec[1] * m];
};

Util.prototype.inherits = function(childClass, superClass) {
  const Surrogate = function() {};
  Surrogate.prototype = superClass.prototype;
  childClass.prototype = new Surrogate();
  childClass.prototype.constructor = childClass;
};


module.exports = Util;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

function MovingObject(obj) {
    this.pos = obj.pos; //[x,y]
    this.vel = obj.vel;
    this.radius = obj.radius;
    this.color = obj.color;
    this.game = obj.game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2*Math.PI, true);
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 5;
  ctx.stroke();
};

MovingObject.prototype.move = function(){
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  if (this.distance(this, otherObject) < this.radius) {
    return true;
  }
  return false;
};



MovingObject.prototype.distance = function(obj1, obj2) {
  const [x_1, y_1] = [obj1.pos[0],obj1.pos[1]];
  const [x_2, y_2] = [obj2.pos[0],obj2.pos[1]];
  
  return Math.sqrt( Math.pow((x_1 - x_2), 2) + Math.pow((y_1 - y_2), 2) );
};

module.exports = MovingObject;

// let move =new  MovingObject({pos:[30, 30], vel:[10, 10], radius:5, color:'red'});
// console.log(move);
//
//
// move.move();
// console.log(move);


/***/ })
/******/ ]);