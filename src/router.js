"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = __importDefault(require("./components/settings"));
const play_1 = require("./components/play");
const registration_1 = __importDefault(require("./components/registration"));
class Router {
    constructor() {
        this.registration = new registration_1.default();
        this.routes = [
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
                    const play = new play_1.Play();
                    play.start();
                },
            },
            {
                name: 'settings',
                url: 'src/components/settings/settings.html',
                html: '',
                handler: () => {
                    const setting = new settings_1.default();
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
                    const form = document.querySelector('#registration');
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
        this.hashChangeHandler = (event) => {
            const splitUrl = event.newURL.split('#');
            const newState = splitUrl[1];
            this.updateRoute(newState);
        };
        this.updateRoute = (name) => {
            const route = this.routes.find((r) => {
                if (r.name === name) {
                    return r;
                }
                return undefined;
            });
            this.loadTemplateHtml(route.url, (templateHtml) => {
                const mainElement = document.body;
                mainElement.innerHTML = templateHtml;
                if (route.handler) {
                    route.handler();
                }
            });
        };
        this.loadTemplateHtml = (url, callback) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.send();
            xhr.addEventListener('readystatechange', () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    callback(xhr.responseText);
                }
            });
        };
        window.location.hash = '#home';
        this.updateRoute('home');
        window.addEventListener('hashchange', this.hashChangeHandler);
    }
}
exports.default = Router;
