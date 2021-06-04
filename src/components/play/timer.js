"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor(element) {
        this.start = () => {
            this.secondCounter = 0;
            this.element.innerHTML = '00:00:00';
            this.timerId = setInterval(this.displayTime, 1000);
        };
        this.displayTime = () => {
            this.secondCounter += 1;
            this.element.textContent = this.getTimeLabelBySecond(this.secondCounter);
        };
        this.getTimeLabelBySecond = (seconds) => {
            const hours = Math.floor(seconds / 3600);
            seconds -= hours * 3600;
            const min = Math.floor(seconds / 60);
            seconds -= min * 60;
            const secondView = this.formatView(seconds);
            const minView = this.formatView(min);
            const hoursView = this.formatView(hours);
            return `${hoursView}:${minView}:${secondView}`;
        };
        this.formatView = (time) => {
            let result = time.toString();
            if (time < 10) {
                // if (Math.floor(time / 10) < 1) {
                result = `0${time}`;
            }
            return result;
        };
        this.stop = () => {
            clearInterval(this.timerId);
        };
        this.element = element;
        this.secondCounter = 0;
        this.timerId = undefined;
    }
}
exports.default = Timer;
