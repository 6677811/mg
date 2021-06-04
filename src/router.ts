import Settings from './components/settings';
import { Play } from './components/play';
import Registration from './components/registration';

export default class Router {
    registration: Registration = new Registration();

    constructor() {
        window.location.hash = '#home';
        this.updateRoute('home');
        window.addEventListener('hashchange', this.hashChangeHandler);
    }

    routes = [
        {
            name: 'home',
            url: 'src/components/home/home.html',
            html: '',
        },
        {
            name: 'play',
            url: 'src/components/play/play.html',
            html: '',
            handler: () => {
                const play = new Play();

                play.start();
            },
        },
        {
            name: 'settings',
            url: 'src/components/settings/settings.html',
            html: '',
            handler: () => {
                const setting = new Settings();

                setting.start();
            },
        },
        {
            name: 'about',
            url: 'src/components/about/about.html',
            html: '',
        },
        {
            name: 'registration',
            url: 'src/components/registration/registration.html',
            html: '',
            handler: () => {
                const form: HTMLElement = document.querySelector('#registration');

                this.registration.setForm(form);
            },
        },
        {
            name: 'score',
            url: 'src/components/score/score.html',
            html: '',
            handler: () => {
                this.registration.getAllUsers();
            },
        },
    ];

    hashChangeHandler = (event: any): void => {
        const splitUrl = event.newURL.split('#');
        const newState = splitUrl[1];

        this.updateRoute(newState);
    };

    updateRoute = (name: string): void => {
        const route = this.routes.find((r): any => {
            if (r.name === name) {
                return r;
            }

            return undefined;
        });

        this.loadTemplateHtml(route.url, (templateHtml: string) => {
            const mainElement = document.body;

            mainElement.innerHTML = templateHtml;

            if (route.handler) {
                route.handler();
            }
        });
    };

    loadTemplateHtml = (url: string, callback: any): void => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.send();

        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        });
    };
}
