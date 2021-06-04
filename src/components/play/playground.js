"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = __importDefault(require("./card"));
class Playground {
    constructor(element, options) {
        this.start = () => {
            this.createCards();
        };
        this.createCards = () => {
            const positions = this.getPositions(this.cardsNumber);
            const cards = this.getCards(this.cardsTypes, this.category, this.pair);
            while (positions.length) {
                const randIndex = this.getRandomNumber(0, positions.length - 1);
                const randomPosition = positions[randIndex];
                const randomCard = cards[randomPosition];
                const cardElement = randomCard.createElement();
                this.element.appendChild(cardElement);
                positions.splice(randIndex, 1);
            }
        };
        this.getRandomNumber = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        this.getPositions = (cardsNumber) => {
            const positions = [];
            for (let i = 0; i < cardsNumber; i += 1) {
                positions[i] = i;
            }
            return positions;
        };
        this.getCards = (cardsTypes, category, pair) => {
            const cards = [];
            for (let i = 0; i < cardsTypes; i += 1) {
                for (let j = 0; j < pair; j += 1) {
                    cards.push(new card_1.default(category, i));
                }
            }
            return cards;
        };
        this.clearScene = () => {
            this.element.innerHTML = '';
        };
        this.element = element;
        this.category = options.category;
        this.cardsNumber = options.cardsNumber;
        this.pair = 2;
        this.cardsTypes = this.cardsNumber / this.pair;
    }
}
exports.default = Playground;
