class RectDraw {
  constructor(attrs={}) {
    this.col = attrs.col || "#000";
    this.size = attrs.size || {"x": 0, "y": 0};
    this.absSize = (attrs.absSize !== undefined ? attrs.absSize : 1 );
    this.position = attrs.position || {"x": 0, "y": 0};
    this.drawCanvas = attrs.drawCanvas || 'c';
    this.fixed = attrs.fixed || 0;
    this.speed = attrs.speed || 0;
    this.speedI = attrs.speedI || 0;
    this.deg = attrs.deg || 0;
    this.opacity = (attrs.opacity !== undefined ? attrs.absSize : 1 );
    this.opacityI = attrs.opacityI || 0;
  }

  update(t=1) {
    this.opacity += this.opacityI*t;
    this.speed += this.speedI*t;
    this.position.x += this.speed*Math.sin(this.deg)*t;
    this.position.y += this.speed*-Math.cos(this.deg)*t;
  }

  draw(update=1, key=undefined) {
    var dc = this.drawCanvas;

    if (update) this.update(0.02);
    if (this.opacity < 0) {
      delete rect[key];
    }

    window[dc].fillStyle = this.col;
    window[dc].globalAlpha = this.opacity;
    var tempPos = getPosition(this.position.x-this.getSize().x/2+(this.fixed?0:cameraPos.x), -this.position.y-this.getSize().y/2+(this.fixed?0:cameraPos.y));
    window[dc].fillRect(
      tempPos.x,
      tempPos.y,
      this.getSize().x*getScreenSquare(),
      this.getSize().y*getScreenSquare()
    );
  }

  getSize = () => {return {x: this.size.x*this.absSize, y: this.size.y*this.absSize} }
}
