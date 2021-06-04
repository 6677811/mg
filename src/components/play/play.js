"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = __importDefault(require("./timer"));
const playground_1 = __importDefault(require("./playground"));
const settings_storage_1 = __importDefault(require("../../settings-storage"));
const user_storage_1 = __importDefault(require("../../user-storage"));
class Play {
    constructor() {
        this.TIME_OVER_MS = 300500;
        this.start = () => {
            const playGroundElement = document.body.querySelector('.playground');
            const elementTimer = document.body.querySelector('.timer__label');
            this.playground = new playground_1.default(playGroundElement, this.settings);
            this.timer = new timer_1.default(elementTimer);
            this.playground.start();
            this.timer.start();
            this.scheduleTimeOver();
            playGroundElement.addEventListener('click', this.clickHandler);
            window.addEventListener('hashchange', this.destroy);
        };
        this.restart = () => {
            this.prevCardElement = null;
            this.foundCardsCounter = 0;
            this.playground.start();
            this.timer.start();
            this.scheduleTimeOver();
        };
        this.scheduleTimeOver = () => {
            this.timeOverTimerId = setTimeout(this.timeOverHandler, this.TIME_OVER_MS);
        };
        this.clickHandler = (event) => {
            if (this.isRotateInProcess) {
                return;
            }
            const currentElement = event.target;
            if (currentElement.classList.contains('card__front')) {
                const cardElement = currentElement.closest('.card');
                if (cardElement.classList.contains('card--hidden')) {
                    return;
                }
                cardElement.classList.toggle('card--rotate');
                if (this.prevCardElement) {
                    this.handleTwoOpenedCards(cardElement);
                }
                else {
                    this.prevCardElement = cardElement;
                }
            }
        };
        this.handleTwoOpenedCards = (cardElement) => {
            if (this.prevCardElement.dataset.type === cardElement.dataset.type) {
                this.prevCardElement.classList.add('card--hidden');
                cardElement.classList.add('card--hidden');
                this.prevCardElement = null;
                this.foundCardsCounter += 2;
                this.checkIsGameOver();
            }
            else {
                this.isRotateInProcess = true;
                this.backRotateTimerId = setTimeout(() => {
                    this.rotateBack(this.prevCardElement, cardElement);
                    this.prevCardElement = null;
                    this.isRotateInProcess = false;
                }, 500);
            }
        };
        this.rotateBack = (prevCardElement, cardElement) => {
            prevCardElement.classList.toggle('card--rotate');
            cardElement.classList.toggle('card--rotate');
        };
        this.checkIsGameOver = () => {
            if (this.foundCardsCounter === this.settings.cardsNumber) {
                this.stop();
                setTimeout(this.showGameWinMessage, 1000);
            }
        };
        this.timeOverHandler = () => {
            this.stop();
            this.showGameOverMessage();
        };
        this.showGameWinMessage = () => {
            if (user_storage_1.default.currentUser) {
                user_storage_1.default.updateUser(this.timer.element.textContent);
            }
            this.playground.clearScene();
            this.showMessage('You are a winner!!!');
        };
        this.showGameOverMessage = () => {
            this.playground.clearScene();
            this.showMessage('Time is over.');
        };
        this.removeMessage = () => {
            if (this.messageElement) {
                this.messageElement.parentNode.removeChild(this.messageElement);
            }
        };
        this.showMessage = (message) => {
            const messageTextElement = document.createElement('p');
            messageTextElement.innerText = message;
            const messageTextWrapperElement = document.createElement('div');
            messageTextWrapperElement.classList.add('game-message__text');
            messageTextWrapperElement.appendChild(messageTextElement);
            const messageMenuButtonElement = document.createElement('a');
            messageMenuButtonElement.classList.add('game-message__button');
            messageMenuButtonElement.innerText = 'Main menu';
            messageMenuButtonElement.href = '#home';
            const messageAgainButtonElement = messageMenuButtonElement.cloneNode(true);
            messageAgainButtonElement.innerText = 'Play again';
            messageAgainButtonElement.href = '#play';
            messageAgainButtonElement.addEventListener('click', () => {
                this.removeMessage();
                this.restart();
            });
            const messageButtonWrapperElement = document.createElement('div');
            messageButtonWrapperElement.classList.add('game-message__button-wrapper');
            messageButtonWrapperElement.appendChild(messageMenuButtonElement);
            messageButtonWrapperElement.appendChild(messageAgainButtonElement);
            const messageElement = document.createElement('div');
            messageElement.classList.add('game-message');
            messageElement.appendChild(messageTextWrapperElement);
            messageElement.appendChild(messageButtonWrapperElement);
            document.body.appendChild(messageElement);
            this.messageElement = messageElement;
        };
        this.stop = () => {
            this.timer.stop();
            clearTimeout(this.backRotateTimerId);
            clearTimeout(this.timeOverTimerId);
        };
        this.destroy = () => {
            this.stop();
            this.removeMessage();
            window.removeEventListener('hashchange', this.destroy);
        };
        this.prevCardElement = null;
        this.isRotateInProcess = false;
        this.backRotateTimerId = undefined;
        this.timeOverTimerId = undefined;
        this.foundCardsCounter = 0;
        this.settings = {
            category: settings_storage_1.default.category,
            cardsNumber: settings_storage_1.default.cardsNumber,
        };
        this.messageElement = null;
        this.timer = null;
    }
}
exports.default = Play;
