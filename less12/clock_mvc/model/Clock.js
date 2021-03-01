class Clock {

    hours;
    minutes;
    seconds;
    run = true;
    timer;
    view;

    constructor(timezone) {
        this.timezone = timezone;
    }

    getView(view) {
       this.view = view;
    }

    getTime() {
        const date = new Date();
        const timeLocale = date.toLocaleTimeString('ru', {timeZone: this.timezone}).split(':');

        const hours = Number(timeLocale[0]);
        const minutes = Number(timeLocale[1]);
        const seconds = Number(timeLocale[2]);

        this.minutes = minutes;
        this.hours = hours;
        this.seconds = seconds;
        this.view.updateTime();
        this.timer = setTimeout(() => {this.getTime()}, 1020 - date.getMilliseconds());
    }

    start() {
        this.getTime();
    }

    stop() {
        clearTimeout(this.timer);
    }
}

export {Clock};
