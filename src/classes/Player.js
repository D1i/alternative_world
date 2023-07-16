class Player {
  constructor(name, url, width, height, x, y) {
    this.name = name || 'Player';
    this.url = url;
    this.sprite = null;
    this.width = width || 100;
    this.height = height || 100;
    this.x = x || 0;
    this.y = y || 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.baseSpeed = 5;
  }
}

export { Player };
