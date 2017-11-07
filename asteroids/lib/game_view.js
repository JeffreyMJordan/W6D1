 var Game = require('./game');
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
