import {ClockView} from "./ClockView.js";

class ClockDomView extends ClockView {

    hoursArrow;
    minutesArrow;
    secondsArrow;

    constructor(side, selector, clock) {
        super(side);
        this.selector = selector;
        this.clock = clock;
    }

    #createClock() {
        const container = this.getContainer(this.selector, 'dom');
        const clockBody = document.createElement('div');
        clockBody.classList.add('clock-' + this.selector);
        clockBody.style.position = 'absolute';
        clockBody.style.width = this.clockSide + 'px';
        clockBody.style.height = this.clockSide + 'px';
        clockBody.style.borderRadius = '50%';
        clockBody.style.backgroundColor = '#fccb66';
        container.append(clockBody);
    }

    #createDialElement() {
        const clockContainer = document.querySelector(`.clock-${this.selector}`);

        function getElement(prop, side) {
            const dialElement = document.createElement('div');
            dialElement.style.width = prop + 'px';
            dialElement.style.height = prop + 'px';
            dialElement.style.position = 'absolute';

            dialElement.style.backgroundColor = '#46b483';
            dialElement.style.borderRadius = '50%';

            dialElement.style.textAlign = 'center';
            dialElement.style.fontSize = side / 20 + 'px';
            dialElement.style.lineHeight = '2';
            clockContainer.append(dialElement);
            return dialElement;
        }

        for (let i = 12; i >= 1; i--) {
            const dialElement = getElement(this.dialSideProportion, this.clockSide);
            const angle = (360 / 12) / 180 * Math.PI * i;

            const dialElementCenterX = this.clockRadiusX + this.dialRadiusPropotion * Math.sin(angle);
            const dialElementCenterY = this.clockRadiusY - this.dialRadiusPropotion * Math.cos(angle);

            dialElement.style.left = dialElementCenterX - (dialElement.clientWidth / 2) + 'px';
            dialElement.style.top = dialElementCenterY - (dialElement.clientHeight / 2) + 'px';
            dialElement.textContent = String(i);
        }
    }

    #getArrow(arrowWidth, arrowHeight) {
        const clockContainer = document.querySelector(`.clock-${this.selector}`);
        const arrow = document.createElement('div');

        arrow.style.width = arrowHeight + 'px';
        arrow.style.height = arrowWidth + this.arrowProportion + 'px';

        arrow.style.borderRadius = arrowHeight + 'px';
        arrow.style.backgroundColor = 'black';
        arrow.style.opacity = '80%';

        arrow.style.position = 'absolute';
        arrow.style.transformOrigin = arrowHeight / 2 + 'px ' + arrowWidth * 0.92 + 'px';
        clockContainer.append(arrow);
        return arrow;
    }

    #createHoursArrow() {
        let hoursArrow = this.#getArrow(this.hoursWidth, this.hoursHeigth);
        hoursArrow.classList.add('hours');
        hoursArrow.style.left = this.clockRadiusX - hoursArrow.clientWidth / 2 + 'px';
        hoursArrow.style.top = this.clockRadiusY - hoursArrow.clientHeight + (this.arrowProportion * 2) + 'px';
        this.hoursArrow = hoursArrow;
    }

    #createMinutesArrow() {
        let minutesArrow = this.#getArrow(this.minutesWidth, this.minutesHeight);
        minutesArrow.classList.add('minutes');
        minutesArrow.style.left = this.clockRadiusX - minutesArrow.clientWidth / 2 + 'px';
        minutesArrow.style.top = this.clockRadiusY - minutesArrow.clientHeight + (this.arrowProportion * 2) + 'px';
        this.minutesArrow = minutesArrow;
    }

    #createSecondsArrow() {
        let secondsArrow = this.#getArrow(this.secondsWidth, this.secondsHeight);
        secondsArrow.classList.add('seconds');
        secondsArrow.style.left = this.clockRadiusX - secondsArrow.clientWidth / 2 + 'px';
        secondsArrow.style.top = this.clockRadiusY - secondsArrow.clientHeight + (this.arrowProportion * 2) + 'px';
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

export {ClockDomView};
