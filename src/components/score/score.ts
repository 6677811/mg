export default class Score {
    data: { firstName: string; lastName: string; score: string }[];

    constructor(
        data: { firstName: string; lastName: string; score: string }[],
    ) {
        this.data = data;
    }

    table: HTMLElement = document.querySelector('#tbody');

    setData(): void {
        const data = this.data.map((row) => `<tr><td>${row.firstName}</td><td>${row.lastName}</td><td>${row.score}</td></tr>`);

        this.table.innerHTML += data.join('');
    }
}
