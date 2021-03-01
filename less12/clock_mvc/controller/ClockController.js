class ClockController {
    model;

    action(model, selector) {
        this.model = model;

        let start = document.querySelector('.button-start-' + selector);
        start.addEventListener('click', (eo) => {
            if (!this.model.run) {
                this.model.run = true;
                this.model.start();
            }
        });

        let stop = document.querySelector('.button-stop-' + selector);
        stop.addEventListener('click', (eo) =>{
            this.model.run = false;
            this.model.stop();
        })
    }
}

export {ClockController}
