export default class Timer {
    element: HTMLElement;

    secondCounter: number;

    timerId: ReturnType<typeof setTimeout>;

    constructor(element: HTMLElement) {
        this.element = element;
        this.secondCounter = 0;
        this.timerId = undefined;
    }

    start = (): void => {
        this.secondCounter = 0;
        this.element.innerHTML = '00:00:00';
        this.timerId = setInterval(this.displayTime, 1000);
    };

    displayTime = (): void => {
        this.secondCounter += 1;
        this.element.textContent = this.getTimeLabelBySecond(
            this.secondCounter,
        );
    };

    getTimeLabelBySecond = (seconds: number): string => {
        const hours: number = Math.floor(seconds / 3600);

        seconds -= hours * 3600;

        const min: number = Math.floor(seconds / 60);

        seconds -= min * 60;

        const secondView: string = this.formatView(seconds);
        const minView: string = this.formatView(min);
        const hoursView: string = this.formatView(hours);

        return `${hoursView}:${minView}:${secondView}`;
    };

    formatView = (time: number): string => {
        let result: string = time.toString();

        if (time < 10) {
            // if (Math.floor(time / 10) < 1) {
            result = `0${time}`;
        }

        return result;
    };

    stop = (): void => {
        clearInterval(this.timerId);
    };
}
