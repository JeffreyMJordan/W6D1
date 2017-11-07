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
