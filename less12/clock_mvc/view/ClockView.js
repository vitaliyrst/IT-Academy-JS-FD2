class ClockView {
    constructor(side) {
        this.clockSide = side;
        this.clockRadiusX = this.clockSide / 2;
        this.clockRadiusY = this.clockSide / 2;
        this.dialSideProportion = this.clockSide / 10;
        this.dialRadiusPropotion = this.clockRadiusX * 0.85;
        this.secondsWidth = this.clockRadiusX;
        this.secondsHeight = this.clockRadiusX * 0.02;
        this.minutesWidth = this.clockRadiusX * 0.88;
        this.minutesHeight = this.clockRadiusX * 0.04;
        this.hoursWidth = this.clockRadiusX * 0.6;
        this.hoursHeigth = this.clockRadiusX * 0.05;
        this.arrowProportion = this.clockSide / 2 / 10;
    }

    getContainer(selector, style) {
        let element;
        let clockContainer = document.createElement('div');
        clockContainer.classList.add('container');

        if (!document.querySelector(`.main-clock-${selector}`)) {
            const buttonStart = document.createElement('button');
            buttonStart.classList.add('button-start-' + selector);
            buttonStart.style.marginBottom = '20px';
            buttonStart.textContent = 'Старт'

            const buttonStop = document.createElement('button');
            buttonStop.classList.add('button-stop-' + selector);
            buttonStop.style.margin = '20px 5px';
            buttonStop.textContent = 'Стоп';

            const city = document.createElement('b');
            city.textContent = selector.toUpperCase();

            clockContainer.append(buttonStart);
            clockContainer.append(buttonStop);
            clockContainer.append(city);

            if (style === 'dom') {
                element = document.createElement('div');
                element.classList.add('main-clock-' + selector);
                element.style.width = this.clockSide + 'px';
                element.style.height = this.clockSide + 'px';
                element.style.position = 'relative';
                clockContainer.append(element);
                document.querySelector('.wrapper').append(clockContainer);
                return element;
            }

            if (style === 'svg') {
                element = document.createElement('div');
                element.classList.add('main-clock-' + selector);
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('id', 'main-clock-' + selector);
                svg.setAttribute('width', String(this.clockSide));
                svg.setAttribute('height', String(this.clockSide));
                element.append(svg);
                clockContainer.append(element);
                document.querySelector('.wrapper').append(clockContainer);
                return svg;
            }

            if (style === 'canvas') {
                element = document.createElement('div');
                element.classList.add('main-clock-' + selector);
                const canvas = document.createElement('canvas');
                canvas.setAttribute('id', 'main-clock-' + selector);
                canvas.width = this.clockSide;
                canvas.height = this.clockSide;
                element.append(canvas);
                clockContainer.append(element);
                document.querySelector('.wrapper').append(clockContainer);
                return canvas.getContext('2d');
            }
        }
    }
}

export {ClockView};
