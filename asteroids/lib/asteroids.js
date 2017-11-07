var GameView = require('./game_view');


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
