export class Router {
    constructor(mainContainer, infoContainer, notFoundContainer) {
        this.mainContainer = mainContainer;
        this.homeContainer = document.querySelector('.palette-container');
        this.infoContainer = infoContainer;
        this.notFoundContainer = notFoundContainer;
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
        console.log(`Rendering route: ${route}`);

        // Hide all containers
        [this.homeContainer, this.infoContainer, this.notFoundContainer].forEach(container => {
            container.classList.add('hidden');
        });

        // Show the container corresponding to the current route
        switch (route) {
            case 'home':
                console.log('Rendering home');
                this.homeContainer.classList.toggle('hidden');
                break;
            case 'info':
                console.log('Rendering info');
                this.infoContainer.classList.toggle('hidden');
                break;
            default:
                console.log('Rendering not found');
                this.notFoundContainer.classList.toggle('hidden');
        }
    }
}
