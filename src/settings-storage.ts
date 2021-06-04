export default class SettingsStorage {
    global = window.global || {};

    static currentCategory: number = 0;

    static number: number = 8;

    static get category(): number {
        return this.currentCategory;
    }

    static set category(category: number) {
        this.currentCategory = category;
    }

    static get cardsNumber(): number {
        return this.number;
    }

    static set cardsNumber(number: number) {
        this.number = number;
    }
}
