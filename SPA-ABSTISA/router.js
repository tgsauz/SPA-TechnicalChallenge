import { Home } from './components/home.js';
import { NotFound } from './components/notfound.js';
import { Info } from './components/info.js';

export class Router {
    constructor(mainContainer) {
        this.mainContainer = mainContainer;
    }

    init() {
        // Manejar eventos de cambio de URL
        window.addEventListener('hashchange', this.handleRouteChange.bind(this));

        // Manejar la ruta inicial
        this.handleRouteChange();
    }

    handleRouteChange() {
        // Obtener la ruta actual desde la URL
        let route = window.location.hash.slice(1);

        if (!route && route === '') {
            route = 'home';
        }

        // Renderizar contenido correspondiente a la ruta
        this.renderRoute(route);
    }

    renderRoute(route) {
        console.log(`Rendering route: ${route}`)
        this.mainContainer.classList.add('transition');

        // Simular un tiempo de carga
        setTimeout(() => {

            // Lógica para renderizar contenido basado en la ruta
            switch (route) {
                case 'home':
                    console.log('Rendering home');
                    this.mainContainer.innerHTML = Home();
                    break;
                case 'info':
                    console.log('Rendering info');
                    this.mainContainer.innerHTML = Info();
                    break;
                default:
                    console.log('Rendering not found');
                    this.mainContainer.innerHTML = NotFound();
            }

            this.mainContainer.classList.remove('transition');
            this.mainContainer.classList.add('transition-in');

            setTimeout(() => {
                this.mainContainer.classList.remove('transition-in');
            }, 1000);
        }, 500);

    }
}
