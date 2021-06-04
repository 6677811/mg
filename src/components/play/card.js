"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    constructor(category, type) {
        this.category = category;
        this.type = type;
        this.IMAGES_URL = '../../src/assets/images/categories/';
        this.createElement = () => {
            const srcFront = `${this.IMAGES_URL}${this.category}/cover.png`;
            const srcBack = `${this.IMAGES_URL}${this.category}/types/${this.type}.png`;
            const card = document.createElement('div');
            card.classList.add('card');
            const frontCard = document.createElement('img');
            frontCard.classList.add('card__front');
            frontCard.src = srcFront;
            frontCard.alt = 'card';
            const backCard = document.createElement('img');
            backCard.classList.add('card__back');
            backCard.src = srcBack;
            backCard.alt = 'card';
            card.appendChild(frontCard);
            card.appendChild(backCard);
            card.dataset.type = this.type.toString();
            return card;
        };
        this.category = category;
        this.type = type;
    }
}
exports.default = Card;
