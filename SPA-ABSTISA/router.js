import { Home } from './components/home.js';
import { NotFound } from './components/notfound.js';
import { Colors } from './components/colors.js';

export class Router {
    constructor(appContainer) {
        this.appContainer = appContainer;
    }

    init() {
        // Manejar eventos de cambio de URL
        window.addEventListener('hashchange', this.handleRouteChange.bind(this));

        // Manejar la ruta inicial
        this.handleRouteChange();
    }

    handleRouteChange() {
        // Obtener la ruta actual desde la URL
        const route = window.location.hash.slice(1);

        // Renderizar contenido correspondiente a la ruta
        this.renderRoute(route);
    }

    renderRoute(route) {
        // Lógica para renderizar contenido basado en la ruta
        switch (route) {
            case 'home':
                this.appContainer.innerHTML = Home();
                break;
            case 'colors':
                this.appContainer.innerHTML = Colors();
                break;
            default:
                this.appContainer.innerHTML = NotFound();
        }
    }
}
