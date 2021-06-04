"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SettingsStorage {
    constructor() {
        this.global = window.global || {};
    }
    static get category() {
        return this.currentCategory;
    }
    static set category(category) {
        this.currentCategory = category;
    }
    static get cardsNumber() {
        return this.number;
    }
    static set cardsNumber(number) {
        this.number = number;
    }
}
exports.default = SettingsStorage;
SettingsStorage.currentCategory = 0;
SettingsStorage.number = 8;
