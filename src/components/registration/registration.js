"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_storage_1 = __importDefault(require("../../user-storage"));
const score_1 = __importDefault(require("../score"));
class Registration {
    constructor() {
        this.button = null;
        this.cancelButton = null;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.testInput = (value, regex) => regex.test(value);
        this.changeForm = () => {
            this.firstName = document.querySelector('#firstName');
            this.lastName = document.querySelector('#lastName');
            this.email = document.querySelector('#email');
            if (this.firstName.value
                && this.testInput(this.firstName.value, /^[a-zA-Z ]*$/)
                && this.lastName.value
                && this.testInput(this.lastName.value, /^[a-zA-Z ]*$/)
                && this.email.value
                && this.testInput(this.email.value, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                this.button.removeAttribute('disabled');
            }
            else {
                this.button.setAttribute('disabled', 'disabled');
            }
        };
        this.cancelClick = () => {
            this.firstName.value = '';
            this.lastName.value = '';
            this.email.value = '';
        };
        this.setForm = (form) => {
            form.addEventListener('submit', this.registrationUser);
            form.addEventListener('input', this.changeForm);
            this.button = document.querySelector('#saveUser');
            this.cancelButton = document.querySelector('#cancelButton');
            this.button.setAttribute('disabled', 'disabled');
            this.cancelButton.addEventListener('click', this.cancelClick);
        };
        this.registrationUser = (event) => {
            event.preventDefault();
            const { target } = event;
            const user = {
                firstName: target[0].value,
                lastName: target[1].value,
                email: target[2].value,
                score: '',
            };
            user_storage_1.default.addUser(user);
            const a = document.createElement('a');
            a.href = '#home';
            a.click();
            a.remove();
        };
        this.getAllUsers = () => {
            const req = user_storage_1.default.openDB();
            const dataArray = [];
            req.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction('users', 'readwrite');
                const users = transaction.objectStore('users');
                const request = users.openCursor();
                request.onsuccess = () => {
                    const cursor = request.result;
                    if (cursor) {
                        const { value } = cursor;
                        dataArray.push(value);
                        cursor.continue();
                    }
                    else {
                        const score = new score_1.default(dataArray);
                        score.setData();
                    }
                    return cursor;
                };
            };
            req.onerror = ({ target }) => {
                console.log(`error opening database ${target.errorCode}`);
            };
        };
    }
}
exports.default = Registration;
