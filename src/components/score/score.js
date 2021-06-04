"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Score {
    constructor(data) {
        this.table = document.querySelector('#tbody');
        this.data = data;
    }
    setData() {
        const data = this.data.map((row) => `<tr><td>${row.firstName}</td><td>${row.lastName}</td><td>${row.score}</td></tr>`);
        this.table.innerHTML += data.join('');
    }
}
exports.default = Score;
