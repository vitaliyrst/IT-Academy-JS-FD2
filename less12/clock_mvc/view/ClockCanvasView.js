import {ClockView} from "./ClockView.js";

class ClockCanvasView extends ClockView {

    constructor(side, selector, clock) {
        super(side);
        this.selector = selector;
        this.clock = clock;
        this.context = this.getContainer(this.selector, 'canvas');
        this.hoursWidth = this.clockRadiusX * 0.06;
        this.hoursHeigth = this.clockRadiusX * 0.5;
        this.minutesWidth = this.clockRadiusX * 0.04;
        this.minutesHeight = this.clockRadiusX * 0.8;
        this.secondsWidth = this.clockRadiusX * 0.02;
        this.secondsHeight = this.clockRadiusX * 0.9;
    }

    #createClock() {
        this.context.beginPath();
        this.context.arc(this.clockRadiusX, this.clockRadiusY, this.clockSide / 2, 0, Math.PI * 2, false);
        this.context.fillStyle = '#fccb66';
        this.context.fill();
    }

    #createDialElement() {
        for (let i = 12; i >= 1; i--) {
            let angle = (360 / 12) / 180 * Math.PI * i;

            let dialElementCenterX = this.clockRadiusX + this.dialRadiusPropotion * Math.sin(angle);
            let dialElementCenterY = this.clockRadiusY - this.dialRadiusPropotion * Math.cos(angle);

            this.context.beginPath();
            this.context.arc(dialElementCenterX, dialElementCenterY,
                this.dialSideProportion / 2, 0, Math.PI * 2, false);
            this.context.fillStyle = '#46b483';
            this.context.fill();

            this.context.font = `normal ${this.clockSide / 20}px Arial`;
            this.context.fillStyle = 'black';
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            this.context.fillText(String(i), dialElementCenterX, dialElementCenterY);
        }
    }

    #getArrow(width, height, arrowAngle) {
        let angle = arrowAngle / 180 * Math.PI;
        let x1 = this.clockRadiusX - this.arrowProportion * 2 * Math.sin(angle);
        let y1 = this.clockRadiusY + this.arrowProportion * 2 * Math.cos(angle);
        let x2 = this.clockRadiusX + height * Math.sin(angle);
        let y2 = this.clockRadiusY - height * Math.cos(angle);

        this.context.beginPath();
        this.context.lineWidth = width;
        this.context.lineCap = 'round';
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.strokeStyle = 'rgba(0, 0, 0, 0.8)';
        this.context.stroke();
    }

    clockInit() {
        this.#createClock();
        this.#createDialElement();
        this.#getArrow(this.hoursWidth, this.hoursHeigth, 0);
        this.#getArrow(this.minutesWidth, this.minutesHeight, 0);
        this.#getArrow(this.secondsWidth, this.secondsHeight, 0);
    }

    updateTime() {
        let secondsAngle = this.clock.seconds * (360 / 60);
        let minutesAngle = this.clock.minutes * (360 / 60) + this.clock.seconds * (360 / 60 / 60);
        let hoursAngle = this.clock.hours * (360 / 12) + this.clock.minutes * (360 / 12 / 60);

        this.#createClock();
        this.#createDialElement();
        this.#getArrow(this.hoursWidth, this.hoursHeigth, hoursAngle);
        this.#getArrow(this.minutesWidth, this.minutesHeight, minutesAngle);
        this.#getArrow(this.secondsWidth, this.secondsHeight, secondsAngle);
    }
}

export {ClockCanvasView};
