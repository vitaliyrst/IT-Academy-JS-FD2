import {Game} from "./Game.js";

class Frog extends Game {
    constructor(data) {
        super(data);
        this.angle = 0;
        this.speed = 0;
        this.bulletRadius = 15;
        this.bulletCenterX = this.left;
        this.bulletCenterY = this.top;
        this.bulletAngle = 0;
        this.bulletState = 0;
    }

    draw() {
        this.#drawFrog();
        this.#drawBullet();
    }

    #drawFrog() {
        let image = new Image();
        image.src = './storage/Frog.gif';
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.frogLeft + this.frogWidth / 2, this.frogTop + this.frogHeight / 2,
            this.frogWidth / 2, 0, Math.PI * 2, false);
        this.context.closePath();
        this.context.clip();
        this.context.translate(this.frogLeft + this.frogWidth / 2, this.frogTop + this.frogHeight / 2);
        this.context.rotate(this.angle);
        this.context.drawImage(image, -this.frogWidth / 2, -this.frogHeight / 2, this.frogWidth, this.frogHeight);
        this.context.restore();
    }

    #drawBullet() {
        let image2 = new Image();
        image2.src = './storage/colors/BlueBall1.jpg';
        this.context.save();
        this.context.beginPath();

        this.context.arc(this.bulletCenterX,
            this.bulletCenterY,
            this.bulletRadius, 0, Math.PI * 2, false);
        this.context.fill();
        this.context.closePath();
        this.context.clip();
        this.context.restore();
        this.updateBullet();
        this.restartBullet();
    }

    updateFrogAngle(angle) {
        this.angle = angle;
    }

    updateBullet() {
        this.bulletCenterX += Math.sin(this.bulletAngle) * this.speed;
        this.bulletCenterY += Math.cos(this.bulletAngle) * this.speed;
    }

    stopBullet() {
        this.speed = 0;
        this.bulletCenterX = this.left;
        this.bulletCenterY = this.top;
        this.bulletState = 0;
    }

    restartBullet() {
        let canvas = document.getElementById('zuma-canvas');

        if (this.bulletCenterX + this.bulletRadius + this.frogWidth / 2 < canvas.offsetLeft ||
            this.bulletCenterY + this.bulletRadius + this.frogHeight / 2 < canvas.offsetTop ||
            this.bulletCenterX - this.bulletRadius > canvas.width ||
            this.bulletCenterY - this.bulletRadius > canvas.height) {
            this.bulletAngle = 0;
            this.speed = 0;
            this.bulletState = 0;
            this.bulletCenterX = this.frogLeft;
            this.bulletCenterY = this.frogTop;
        }
    }
}

export {Frog};