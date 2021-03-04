class FrogController {
    constructor(model) {
        this.model = model;
    }

    move() {
        document.getElementById('canvas').addEventListener('mousemove', (eo) => {
            let clientX = eo.clientX;
            let clientY = eo.clientY;
            let angle = Math.atan2(-(clientX - (this.model.left + this.model.width / 2)),
                clientY - (this.model.top + this.model.height / 2));
            this.model.updateAngle(angle);
        });

    }
}

export {FrogController};