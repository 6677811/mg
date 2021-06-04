"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const settings_storage_1 = __importDefault(require("../../settings-storage"));
class Settings {
    constructor() {
        this.start = () => {
            this.difficultyElement = document.body.querySelector('.difficulty__options');
            this.difficultyElement.addEventListener('click', this.difficultyClickHandler);
            this.setCheckedDifficulty();
            this.categoryElement = document.body.querySelector('.card-categories__options');
            this.categoryElement.addEventListener('click', this.categoryClickHandler);
            this.setCheckedCategory();
        };
        this.setCheckedDifficulty = () => {
            const currentDifficulty = settings_storage_1.default.cardsNumber;
            const difficultyOptionElement = this.difficultyElement.querySelector(`[data-difficulty="${currentDifficulty}"]`);
            difficultyOptionElement.classList.add('difficulty__options-item--checked');
        };
        this.difficultyClickHandler = (event) => {
            const currentElement = event.target;
            const optionElement = currentElement.closest('.difficulty__options-item');
            if (optionElement) {
                for (let i = 0; i < this.difficultyElement.children.length; i += 1) {
                    this.difficultyElement.children[i].classList.remove('difficulty__options-item--checked');
                }
                optionElement.classList.add('difficulty__options-item--checked');
            }
            settings_storage_1.default.cardsNumber = parseInt(optionElement.dataset.difficulty, 10);
        };
        this.setCheckedCategory = () => {
            const currentCategory = settings_storage_1.default.category;
            const categoryOptionElement = this.categoryElement.querySelector(`[data-category="${currentCategory}"]`);
            categoryOptionElement.classList.add('card-categories__options-item--checked');
        };
        this.categoryClickHandler = (event) => {
            const currentElement = event.target;
            const optionElement = currentElement.closest('.card-categories__options-item');
            if (optionElement) {
                for (let i = 0; i < this.categoryElement.children.length; i += 1) {
                    this.categoryElement.children[i].classList.remove('card-categories__options-item--checked');
                }
                optionElement.classList.add('card-categories__options-item--checked');
            }
            settings_storage_1.default.category = parseInt(optionElement.dataset.category, 10);
        };
    }
}
exports.default = Settings;
