class Ball {
    constructor(x, y, path, context) {
        this.x = x;
        this.y = y;
        this.context = context;
        this.path = path;
        this.radius = 15;
        this.speed = 1;
        this.color = 0;
        this.pathSection = 0;
        this.next = 0;
        this.angle = 0;
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = 4;
        this.numberOfFrames = 9;
        this.width = 270;
        this.height = 30;
    }

    setColor(colors) {
        let randomColor = Math.floor(Math.random() * colors.length);
        this.color = colors[randomColor];
    }

    draw() {

        let ballImage = new Image();
        ballImage.src = this.color;

          this.context.save();
          this.context.beginPath();
          this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          this.context.fill()
          this.context.closePath();
          this.context.clip();

this.context.translate(this.x - this.radius, this.y - this.radius);
        this.context.drawImage(ballImage, this.frameIndex * this.width / this.numberOfFrames, 0,
            this.width / this.numberOfFrames, this.height, 0, 0, this.width / this.numberOfFrames, this.height);

        this.context.restore();

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
            }
        }
        this.tickCount++;

    }

    update() {
        if (this.path.length < 2) {
            return;
        }
        if (this.pathSection >= this.path.length) {
            this.pathSection = 0;
        }
        if (this.pathSection === 0) {
            this.x = this.path[0].x;
            this.y = this.path[0].y;
            this.pathSection++;
        } else {
            let angle = Math.atan2(this.path[this.pathSection].x - this.x, this.path[this.pathSection].y - this.y);
            this.angle = angle;
            if (Math.abs(this.x - this.path[this.pathSection].x) < this.speed &&
                Math.abs(this.y - this.path[this.pathSection].y) < this.speed) {
                this.x = this.path[this.pathSection].x;
                this.y = this.path[this.pathSection].y;
                this.pathSection++;
            } else {
                this.x += Math.sin(angle) * this.speed;
                this.y += Math.cos(angle) * this.speed;
            }
        }

    }
}

export {Ball};