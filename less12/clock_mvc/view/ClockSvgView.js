import {ClockView} from "./ClockView.js";

class ClockSvgView extends ClockView {

    hoursArrow;
    minutesArrow;
    secondsArrow;

    constructor(side, selector, clock) {
        super(side);
        this.selector = selector;
        this.clock = clock;
        this.container = this.getContainer(this.selector, 'svg');
        this.hoursWidth = this.clockRadiusX * 0.5;
        this.hoursHeigth = this.clockRadiusX * 0.06;
        this.minutesWidth = this.clockRadiusX * 0.2;
        this.minutesHeight = this.clockRadiusX * 0.04;
        this.secondsWidth = this.clockRadiusX * 0.1;
        this.secondsHeight = this.clockRadiusX * 0.02;
    }

    #createClock() {
        const clockBody = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        clockBody.setAttribute('id', 'clock-' + this.selector);
        clockBody.setAttribute('cx', String(this.clockRadiusX));
        clockBody.setAttribute('cy', String(this.clockRadiusY));
        clockBody.setAttribute('r', String(this.clockSide / 2));
        clockBody.setAttribute('fill', '#fccb66');
        this.container.append(clockBody);
    }

    #createDialElement() {
        const container = this.container;

        function getElement(prop) {
            const dialElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dialElement.setAttribute('r', String(prop));
            dialElement.setAttribute('fill', '#46b483');
            container.append(dialElement);
            return dialElement;
        }

        function getText(side) {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('fill', 'black')
            text.setAttribute('font-size', String(side / 20));
            text.setAttribute('text-anchor', 'middle');
            container.append(text);
            return text;

        }

        for (let i = 12; i >= 1; i--) {
            const dialElement = getElement(this.dialSideProportion / 2);
            const text = getText(this.clockSide);
            const angle = (360 / 12) / 180 * Math.PI * i;

            const dialElementCenterX = this.clockRadiusX + this.dialRadiusPropotion * Math.sin(angle);
            const dialElementCenterY = this.clockRadiusY - this.dialRadiusPropotion * Math.cos(angle);

            dialElement.setAttribute('cx',
                String(dialElementCenterX - (dialElement.clientWidth / 2)));
            dialElement.setAttribute('cy',
                String(dialElementCenterY - (dialElement.clientHeight / 2)));

            text.setAttribute('x',
                String(dialElementCenterX - (dialElement.clientWidth / 2)));
            text.setAttribute('y',
                String(dialElementCenterY + (this.dialSideProportion / 2 / 3) - (dialElement.clientHeight / 2)));
            text.textContent = String(i);
        }
    }

    #getArrow() {
        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        arrow.setAttribute('x1', String(this.clockRadiusX));
        arrow.setAttribute('x2', String(this.clockRadiusX));
        arrow.setAttribute('y2', String(this.clockRadiusX + this.arrowProportion *2));

        arrow.setAttribute('stroke', 'black');
        arrow.setAttribute('stroke-linecap', 'round');
        arrow.setAttribute('opacity', '80%');

        arrow.style.transformOrigin = '50% 50%';
        this.container.append(arrow);
        return arrow;
    }

    #createHoursArrow() {
        let hoursArrow = this.#getArrow();
        hoursArrow.setAttribute('y1', this.hoursWidth);
        hoursArrow.setAttribute('stroke-width', this.hoursHeigth);
        this.hoursArrow = hoursArrow;
    }

    #createMinutesArrow() {
        let minutesArrow = this.#getArrow();
        minutesArrow.setAttribute('y1', this.minutesWidth);
        minutesArrow.setAttribute('stroke-width', this.minutesHeight);
        this.minutesArrow = minutesArrow;
    }

    #createSecondsArrow() {
        let secondsArrow = this.#getArrow();
        secondsArrow.setAttribute('y1', this.secondsWidth);
        secondsArrow.setAttribute('stroke-width', this.secondsHeight);
        this.secondsArrow = secondsArrow;
    }

    clockInit() {
        this.#createClock();
        this.#createDialElement();
        this.#createHoursArrow();
        this.#createMinutesArrow();
        this.#createSecondsArrow();
    }

    updateTime() {
        let secondsAngle = this.clock.seconds * (360 / 60);
        let minutesAngle = this.clock.minutes * (360 / 60) + this.clock.seconds * (360 / 60 / 60);
        let hoursAngle = this.clock.hours * (360 / 12) + this.clock.minutes * (360 / 12 / 60);

        this.hoursArrow.style.transform = `rotate(${hoursAngle}deg)`;
        this.minutesArrow.style.transform = `rotate(${minutesAngle}deg)`;
        this.secondsArrow.style.transform = `rotate(${secondsAngle}deg)`;
    }
}

export {ClockSvgView};