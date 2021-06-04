import Card from './card';

export default class Playground {
    element: HTMLElement;

    category: number;

    cardsNumber: number;

    pair: number;

    cardsTypes: number;

    constructor(
        element: HTMLElement,
        options: { category: number; cardsNumber: number },
    ) {
        this.element = element;
        this.category = options.category;
        this.cardsNumber = options.cardsNumber;
        this.pair = 2;
        this.cardsTypes = this.cardsNumber / this.pair;
    }

    start = (): void => {
        this.createCards();
    };

    createCards = (): void => {
        const positions: number[] = this.getPositions(this.cardsNumber);
        const cards: Card[] = this.getCards(
            this.cardsTypes,
            this.category,
            this.pair,
        );

        while (positions.length) {
            const randIndex: number = this.getRandomNumber(
                0,
                positions.length - 1,
            );
            const randomPosition: number = positions[randIndex];
            const randomCard: Card = cards[randomPosition];
            const cardElement: HTMLElement = randomCard.createElement();

            this.element.appendChild(cardElement);
            positions.splice(randIndex, 1);
        }
    };

    getRandomNumber = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    getPositions = (cardsNumber: number): number[] => {
        const positions = [];

        for (let i = 0; i < cardsNumber; i += 1) {
            positions[i] = i;
        }

        return positions;
    };

    getCards = (cardsTypes: number, category: number, pair: number): Card[] => {
        const cards: Card[] = [];

        for (let i = 0; i < cardsTypes; i += 1) {
            for (let j = 0; j < pair; j += 1) {
                cards.push(new Card(category, i));
            }
        }

        return cards;
    };

    clearScene = (): void => {
        this.element.innerHTML = '';
    };
}
