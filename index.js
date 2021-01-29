canvas = document.getElementById('canvas');
c = canvas.getContext('2d');

var cameraPos = {x: 0, y: 0};
var gravity = 0;
var cd = 0;
var tempCD = 0;
var rect = {};

var player = {
  'depth': 0
}

var canvasS = {
  size: {"x": innerWidth, "y": innerHeight}
}
var cs = canvasS.size;

function updateCanvas() {
  cs.x = getScreenSize().x;
  cs.y = getScreenSize().y;

  canvas.width = cs.x;
  canvas.height = cs.y;

  c.clearRect(0, 0, cs.x, cs.y);

  for (var i in rect) {
    rect[i].draw(1, i);
  }
}

function calcGravity() {
  gravity += 0.006;
  cameraPos.y -= gravity/100;

  if (cameraPos.y < -player.depth) {
    cameraPos.y = -player.depth;
    if (gravity > 1) {
      player.depth += gravity/10;
      rect.hole.size.y = player.depth;
      rect.hole.position.y = -player.depth/2-0.025;
      for (var i = 0; i < gravity*10; i++) {
        rect['Dig' + new Date().getTime()] = new RectDraw({"col": hsvToRgb(Math.random()*0.1+0.1, Math.random()*0.2+0.6, Math.random()*0.2+0.6), "size": {x: tempS, y: tempS}, "position": {x: 0, y: -0.02+cameraPos.y}, 'speed': Math.random()*0.15+0.7, 'opacityI': -0.3, 'speedI': -0.1, 'deg': tempD});
      }
    }
    gravity = 0;
    if (tempCD) {
      cd = new Date().getTime()+300;
      tempCD = 0;
    }
  }
}

function infoUpdate() {
  document.getElementById('info').innerHTML = `gravity: ${gravity.toFixed(6)}<br>height: ${cameraPos.y.toFixed(6)}`;
}

rect.background = new RectDraw({"col": '#93ede2', "size": {x: 9, y: 5}, "position": {x: 0, y: 0}, "fixed": 1});
rect.floor = new RectDraw({"col": '#bd4913', "size": {x: 9, y: 9}, "position": {x: 0, y: -4.525}});
rect.grass = new RectDraw({"col": '#49ba23', "size": {x: 9, y: 0.025}, "position": {x: 0, y: -0.0375}});
rect.hole = new RectDraw({"col": '#444', "size": {x: 0.15, y: player.depth}, "position": {x: 0, y: -player.depth/2-0.025}});
rect.player = new RectDraw({"col": '#666', "size": {x: 0.05, y: 0.05}, "position": {x: 0, y: 0}, "fixed": 1});
rect.playerI = new RectDraw({"col": '#dae85d', "size": {x: 0.042, y: 0.042}, "position": {x: 0, y: 0}, "fixed": 1});

window.onwheel = function (e) {
  if (cd > new Date().getTime()) return;
  cameraPos.y += 0.01;
  tempCD = 1;
  var tempS = Math.random()*0.01+0.01;
  var tempD = Math.PI*(-1/6+Math.random()/3);
  rect['Fire' + new Date().getTime()] = new RectDraw({"col": hsvToRgb(Math.random()*0.1, Math.random()*0.2+0.6, Math.random()*0.2+0.6), "size": {x: tempS, y: tempS}, "position": {x: 0, y: -0.02+cameraPos.y}, 'speed': Math.random()*0.15+0.7, 'opacityI': -0.3, 'speedI': -0.1, 'deg': tempD});
}

setInterval( function () {
  updateCanvas();
  infoUpdate();
  calcGravity();
}, 20);
