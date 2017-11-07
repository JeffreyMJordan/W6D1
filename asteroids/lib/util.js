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
