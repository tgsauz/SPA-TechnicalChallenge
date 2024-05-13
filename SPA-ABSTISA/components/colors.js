export function Colors() {
    let paletteContainer = document.querySelector('.palette-container');

    if (!paletteContainer) {
        paletteContainer = document.createElement('div');
        paletteContainer.className = 'palette-container';
        document.body.appendChild(paletteContainer);
    }

    const colorBoxes = Array.from({length: 6}, () => document.createElement('div'));

    colorBoxes.forEach((colorBox) => {
        colorBox.className = 'color-box';
        paletteContainer.appendChild(colorBox);
    });

    // Función para generar una paleta de colores
    function generateColorPalette(baseColor) {
        return generateColorScheme(baseColor);
    }

    // Función para generar combinaciones de colores armoniosas
    function generateColorScheme(baseColor) {
        const colorsInScheme = [];
        const offset = 13;
        // Generates the first color randomly        
        // Generate the last color as a contrast to the first color
        const contrastColor = (baseColor + 180) % 360;
        
        // Generate the third color as analogous between the first and the last color
        const analogousColor2 = (baseColor + contrastColor + offset) / 2;
        
        // Generate the second color as analogous between the first and the third color
        const analogousColor1 = (baseColor + analogousColor2 + offset) / 2;
        
        // Generate the fourth color as complementary to the third color
        const complementaryColor = (analogousColor2 + 90 + offset) % 360;

        // Generate the fifth color as analogous between the first and the third color
        const analogousColor3 = (contrastColor + complementaryColor + offset) / 2;

        colorsInScheme.push(`hsl(${baseColor}, 70%, 45%)`);// 1st color
        colorsInScheme.push(`hsl(${analogousColor1}, 70%, 45%)`);// 2nd color
        colorsInScheme.push(`hsl(${analogousColor2}, 70%, 45%)`);// 3rd color
        colorsInScheme.push(`hsl(${complementaryColor}, 70%, 45%)`);// 4th color
        colorsInScheme.push(`hsl(${analogousColor3}, 70%, 45%)`);// 5th color
        colorsInScheme.push(`hsl(${contrastColor}, 70%, 45%)`);// 6th color

        return colorsInScheme;
    }

    function updateColorElements(colors) {
        const colorBoxes = document.querySelectorAll('.color-box');
    
        colorBoxes.forEach((colorBox, index) => {
            colorBox.style.backgroundColor = colors[index];
        });
    }

    // Generate initial color palette and update color elements
    const initialColors = generateColorPalette(Math.floor(Math.random() * 360));
    updateColorElements(initialColors);

    // Update color elements when the space key is pressed
    window.addEventListener('keypress', event => {
        if (event.key === 'Space') {
            const newColors = generateColorPalette(Math.floor(Math.random() * 360));
            updateColorElements(newColors);
        }
    });
}