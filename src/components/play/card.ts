export default class Card {
    IMAGES_URL: string = 'src/assets/images/categories/';

    constructor(public category: number, public type: number) {
        this.category = category;
        this.type = type;
    }

    public createElement = (): HTMLElement => {
        const srcFront = `${this.IMAGES_URL}${this.category}/cover.png`;
        const srcBack = `${this.IMAGES_URL}${this.category}/types/${this.type}.png`;

        const card: HTMLElement = document.createElement('div');

        card.classList.add('card');

        const frontCard: HTMLImageElement = document.createElement('img');

        frontCard.classList.add('card__front');
        frontCard.src = srcFront;
        frontCard.alt = 'card';

        const backCard: HTMLImageElement = document.createElement('img');

        backCard.classList.add('card__back');
        backCard.src = srcBack;
        backCard.alt = 'card';

        card.appendChild(frontCard);
        card.appendChild(backCard);
        card.dataset.type = this.type.toString();

        return card;
    };
}
