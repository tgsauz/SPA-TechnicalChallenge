export default function Info() {
    return `
            <h1>Información sobre proyecto</h1>
            <p>Para generar una paleta de colores, presiona la barra espaciadora.</p>
            <p>Para bloquear un color, presiona el candado.</p>
            <p>Este proyecto fue inspirado por la pagina Coolors. </p>
            <p>Genera colores harmoniosos de manera analoga y por contraste.</p>
            <p>Utiliza la API de thecolorapi.com para identificar los colores.</p>
            <p>Llamados de atención: </p>
            <p>De vez en cuando parece que se repiten los colores pero esto se debe a que los valores son muy similares.</p>
            <p>Los colores tienden a tener una saturación y luminosidad similar por el algoritmo que se implemento, esto causa que por ahora no se puedan mezclar tonalidades como 'pastel' con otras más opacas.</p>
    `;
}