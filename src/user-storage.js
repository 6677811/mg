"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserStorage {
    static openDB() {
        this.openRequest = indexedDB.open('6677811', 1);
        this.openRequest.onupgradeneeded = (event) => {
            this.db = event.target.result;
            this.users = this.db.createObjectStore('users', {
                autoIncrement: true,
            });
        };
        this.openRequest.onsuccess = (event) => {
            this.db = event.target.result;
        };
        this.openRequest.onerror = (event) => {
            console.log(`error opening database ${event.target.errorCode}`);
        };
        return this.openRequest;
    }
    static addUser(user) {
        const req = this.openDB();
        req.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction('users', 'readwrite');
            const users = transaction.objectStore('users');
            const request = users.add(user);
            request.onsuccess = () => {
                this.currentUser = request.result;
            };
        };
        req.onerror = (event) => {
            console.log(`error opening database ${event.target.errorCode}`);
        };
    }
    static updateUser(score) {
        const req = this.openDB();
        req.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction('users', 'readwrite');
            const users = transaction.objectStore('users');
            const getUser = users.get(this.currentUser);
            getUser.onsuccess = () => {
                const user = getUser.result;
                if (user.score.length) {
                    const split = user.score.split(':');
                    const seconds = +split[0] * 60 * 60 + +split[1] * 60 + +split[2];
                    const splitNew = score.split(':');
                    const secondsNew = +splitNew[0] * 60 * 60
                        + +splitNew[1] * 60
                        + +splitNew[2];
                    if (secondsNew < seconds) {
                        this.updateUserScore(score, user, users, this.currentUser);
                    }
                }
                else {
                    this.updateUserScore(score, user, users, this.currentUser);
                }
            };
        };
        req.onerror = (event) => {
            console.log(`error opening database ${event.target.errorCode}`);
        };
    }
    static updateUserScore(score, user, users, currentUser) {
        user.score = score;
        const request = users.put(user, currentUser);
        request.onsuccess = () => {
            currentUser = request.result;
        };
    }
}
exports.default = UserStorage;
UserStorage.currentUser = 0;
