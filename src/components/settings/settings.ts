import SettingsStorage from '../../settings-storage';

export default class Settings {
    difficultyElement: HTMLElement;

    categoryElement: HTMLElement;

    start = (): void => {
        this.difficultyElement = document.body.querySelector(
            '.difficulty__options',
        );
        this.difficultyElement.addEventListener(
            'click',
            this.difficultyClickHandler,
        );
        this.setCheckedDifficulty();

        this.categoryElement = document.body.querySelector(
            '.card-categories__options',
        );
        this.categoryElement.addEventListener(
            'click',
            this.categoryClickHandler,
        );
        this.setCheckedCategory();
    };

    setCheckedDifficulty = (): void => {
        const currentDifficulty = SettingsStorage.cardsNumber;
        const difficultyOptionElement = this.difficultyElement.querySelector(
            `[data-difficulty="${currentDifficulty}"]`,
        );

        difficultyOptionElement.classList.add(
            'difficulty__options-item--checked',
        );
    };

    difficultyClickHandler = (event: any): void => {
        const currentElement = event.target;
        const optionElement = currentElement.closest(
            '.difficulty__options-item',
        );

        if (optionElement) {
            for (let i = 0; i < this.difficultyElement.children.length; i += 1) {
                this.difficultyElement.children[i].classList.remove(
                    'difficulty__options-item--checked',
                );
            }

            optionElement.classList.add('difficulty__options-item--checked');
        }

        SettingsStorage.cardsNumber = parseInt(
            optionElement.dataset.difficulty,
            10,
        );
    };

    setCheckedCategory = (): void => {
        const currentCategory = SettingsStorage.category;
        const categoryOptionElement = this.categoryElement.querySelector(
            `[data-category="${currentCategory}"]`,
        );

        categoryOptionElement.classList.add(
            'card-categories__options-item--checked',
        );
    };

    categoryClickHandler = (event: any): void => {
        const currentElement = event.target;
        const optionElement = currentElement.closest(
            '.card-categories__options-item',
        );

        if (optionElement) {
            for (let i = 0; i < this.categoryElement.children.length; i += 1) {
                this.categoryElement.children[i].classList.remove(
                    'card-categories__options-item--checked',
                );
            }

            optionElement.classList.add(
                'card-categories__options-item--checked',
            );
        }

        SettingsStorage.category = parseInt(optionElement.dataset.category, 10);
    };
}
