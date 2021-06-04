import Timer from './timer';
import Playground from './playground';
import SettingsStorage from '../../settings-storage';
import UserStorage from '../../user-storage';

export default class Play {
    prevCardElement: HTMLElement;

    isRotateInProcess: boolean;

    backRotateTimerId: ReturnType<typeof setTimeout>;

    timeOverTimerId: ReturnType<typeof setTimeout>;

    foundCardsCounter: number;

    messageElement: HTMLElement;

    settings: { category: number; cardsNumber: number };

    timer: Timer;

    playground: Playground;

    constructor() {
        this.prevCardElement = null;
        this.isRotateInProcess = false;
        this.backRotateTimerId = undefined;
        this.timeOverTimerId = undefined;
        this.foundCardsCounter = 0;
        this.settings = {
            category: SettingsStorage.category,
            cardsNumber: SettingsStorage.cardsNumber,
        };
        this.messageElement = null;
        this.timer = null;
    }

    TIME_OVER_MS = 300500;

    startRotate = () => {
        const cards = document.querySelectorAll('.card');

        cards.forEach((card) => {
            card.classList.add('card--rotate');
        });
    };

    endRotate = () => {
        const cards = document.querySelectorAll('.card');

        cards.forEach((card) => {
            card.classList.remove('card--rotate');
        });
    };

    start = (): void => {
        const playGroundElement: HTMLElement = document.body.querySelector('.playground');
        const elementTimer: HTMLElement = document.body.querySelector('.timer__label');

        this.playground = new Playground(playGroundElement, this.settings);
        this.timer = new Timer(elementTimer);

        this.playground.start();
        this.timer.start();
        this.startRotate();
        setTimeout(this.endRotate, 3000);
        this.scheduleTimeOver();
        playGroundElement.addEventListener('click', this.clickHandler);
        window.addEventListener('hashchange', this.destroy);
    };

    restart = (): void => {
        this.prevCardElement = null;
        this.foundCardsCounter = 0;
        this.playground.start();
        this.timer.start();
        this.scheduleTimeOver();
    };

    scheduleTimeOver = (): void => {
        this.timeOverTimerId = setTimeout(
            this.timeOverHandler,
            this.TIME_OVER_MS,
        );
    };

    clickHandler = (event: any): void => {
        if (this.isRotateInProcess) {
            return;
        }

        const currentElement: HTMLElement = event.target;

        if (currentElement.classList.contains('card__front')) {
            const cardElement: HTMLElement = currentElement.closest('.card');

            if (cardElement.classList.contains('card--hidden')) {
                return;
            }

            cardElement.classList.toggle('card--rotate');

            if (this.prevCardElement) {
                this.handleTwoOpenedCards(cardElement);
            } else {
                this.prevCardElement = cardElement;
            }
        }
    };

    handleTwoOpenedCards = (cardElement: HTMLElement): void => {
        if (this.prevCardElement.dataset.type === cardElement.dataset.type) {
            this.removeBorder();
            this.prevCardElement.classList.add('card--hidden');
            cardElement.classList.add('card--hidden');
            this.prevCardElement = null;
            this.foundCardsCounter += 2;
            this.checkIsGameOver();
        } else {
            this.prevCardElement.querySelector('.card__back').classList.add('red-border');
            cardElement.querySelector('.card__back').classList.add('red-border');
            this.isRotateInProcess = true;
            this.backRotateTimerId = setTimeout(() => {
                this.rotateBack(this.prevCardElement, cardElement);
                this.prevCardElement = null;
                this.isRotateInProcess = false;
            }, 500);
            setTimeout(this.removeBorder, 3000);
        }
    };

    removeBorder = () => {
        const cards = document.querySelectorAll('.red-border');

        cards.forEach((card) => {
            card.classList.remove('red-border');
        });
    };

    rotateBack = (
        prevCardElement: HTMLElement,
        cardElement: HTMLElement,
    ): void => {
        prevCardElement.classList.toggle('card--rotate');
        cardElement.classList.toggle('card--rotate');
    };

    checkIsGameOver = (): void => {
        if (this.foundCardsCounter === this.settings.cardsNumber) {
            this.stop();
            setTimeout(this.showGameWinMessage, 1000);
        }
    };

    timeOverHandler = (): void => {
        this.stop();
        this.showGameOverMessage();
    };

    showGameWinMessage = (): void => {
        if (UserStorage.currentUser) {
            UserStorage.updateUser(this.timer.element.textContent);
        }

        this.playground.clearScene();
        this.showMessage('You are a winner!!!');
    };

    showGameOverMessage = (): void => {
        this.playground.clearScene();
        this.showMessage('Time is over.');
    };

    removeMessage = () => {
        if (this.messageElement) {
            this.messageElement.parentNode.removeChild(this.messageElement);
        }
    };

    showMessage = (message: string): void => {
        const messageTextElement: HTMLElement = document.createElement('p');

        messageTextElement.innerText = message;

        const messageTextWrapperElement: HTMLElement = document.createElement('div');

        messageTextWrapperElement.classList.add('game-message__text');
        messageTextWrapperElement.appendChild(messageTextElement);

        const messageMenuButtonElement: HTMLAnchorElement = document.createElement('a');

        messageMenuButtonElement.classList.add('game-message__button');
        messageMenuButtonElement.innerText = 'Main menu';
        messageMenuButtonElement.href = '#home';

        const messageAgainButtonElement: HTMLAnchorElement = <
            HTMLAnchorElement
        >messageMenuButtonElement.cloneNode(true);

        messageAgainButtonElement.innerText = 'Play again';
        messageAgainButtonElement.href = '#play';
        messageAgainButtonElement.addEventListener('click', () => {
            this.removeMessage();
            this.restart();
        });

        const messageButtonWrapperElement: HTMLElement = document.createElement('div');

        messageButtonWrapperElement.classList.add(
            'game-message__button-wrapper',
        );
        messageButtonWrapperElement.appendChild(messageMenuButtonElement);
        messageButtonWrapperElement.appendChild(messageAgainButtonElement);

        const messageElement: HTMLElement = document.createElement('div');

        messageElement.classList.add('game-message');
        messageElement.appendChild(messageTextWrapperElement);
        messageElement.appendChild(messageButtonWrapperElement);

        document.body.appendChild(messageElement);
        this.messageElement = messageElement;
    };

    stop = (): void => {
        this.timer.stop();
        clearTimeout(this.backRotateTimerId);
        clearTimeout(this.timeOverTimerId);
    };

    destroy = (): void => {
        this.stop();
        this.removeMessage();
        window.removeEventListener('hashchange', this.destroy);
    };
}
