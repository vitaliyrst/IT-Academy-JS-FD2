class Frog {
    constructor(width, height, left, top, context) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.context = context;
        this.angle = 0;
    }

    draw() {
        let image = new Image();
        image.src = './storage/Frog.gif';
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.left + this.width / 2, this.top + this.height / 2,
            this.width / 2, 0, Math.PI * 2, false);
        this.context.closePath();
        this.context.clip();

        this.context.translate(this.left + this.width / 2, this.top + this.height / 2);
        this.context.rotate(this.angle);
        this.context.drawImage(image, -this.width / 2, -this.height / 2, this.width, this.height);
        this.context.restore();
    }

    updateAngle(angle) {
        this.angle = angle;
    }
}

export {Frog};