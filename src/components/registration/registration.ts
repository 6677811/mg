import UserStorage from '../../user-storage';
import Score from '../score';

export default class Registration {
    button: HTMLElement = null;

    cancelButton: HTMLElement = null;

    firstName: HTMLInputElement = null;

    lastName: HTMLInputElement = null;

    email: HTMLInputElement = null;

    testInput = (value: string, regex: RegExp): boolean => regex.test(value);

    changeForm = (): void => {
        this.firstName = document.querySelector('#firstName');
        this.lastName = document.querySelector('#lastName');
        this.email = document.querySelector('#email');

        if (
            this.firstName.value
            && this.testInput(this.firstName.value, /^[a-zA-Z ]*$/)
            && this.lastName.value
            && this.testInput(this.lastName.value, /^[a-zA-Z ]*$/)
            && this.email.value
            && this.testInput(
                this.email.value,
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            )
        ) {
            this.button.removeAttribute('disabled');
        } else {
            this.button.setAttribute('disabled', 'disabled');
        }
    };

    cancelClick = () => {
        this.firstName.value = '';
        this.lastName.value = '';
        this.email.value = '';
    };

    setForm = (form: HTMLElement): void => {
        form.addEventListener('submit', this.registrationUser);
        form.addEventListener('input', this.changeForm);

        this.button = document.querySelector('#saveUser');
        this.cancelButton = document.querySelector('#cancelButton');
        this.button.setAttribute('disabled', 'disabled');
        this.cancelButton.addEventListener('click', this.cancelClick);
    };

    registrationUser = (event: any): void => {
        event.preventDefault();

        const { target } = event;
        const user = {
            firstName: target[0].value,
            lastName: target[1].value,
            email: target[2].value,
            score: '',
        };

        UserStorage.addUser(user);

        const a: HTMLAnchorElement = document.createElement('a');

        a.href = '#home';
        a.click();
        a.remove();
    };

    getAllUsers = (): void => {
        const req: IDBOpenDBRequest = UserStorage.openDB();
        const dataArray: {
            firstName: string;
            lastName: string;
            score: string;
        }[] = [];

        req.onsuccess = (event: any) => {
            const db = event.target.result;
            const transaction = db.transaction('users', 'readwrite');
            const users = transaction.objectStore('users');

            const request = users.openCursor();

            request.onsuccess = () => {
                const cursor = request.result;

                if (cursor) {
                    const { value } = cursor;

                    dataArray.push(value);
                    cursor.continue();
                } else {
                    const score = new Score(dataArray);

                    score.setData();
                }

                return cursor;
            };
        };

        req.onerror = ({ target }: any) => {
            console.log(`error opening database ${target.errorCode}`);
        };
    };
}
