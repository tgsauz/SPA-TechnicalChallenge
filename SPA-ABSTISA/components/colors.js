export function initializeColors() {
    let paletteContainer = document.querySelector('.palette-container');
    const appContainer = document.getElementById('app');

    if (!paletteContainer) {
        paletteContainer = document.createElement('div');
        paletteContainer.className = 'palette-container';
        appContainer.appendChild(paletteContainer);
    }

    paletteContainer.className = 'palette-container';

    let colorBoxes = Array.from(paletteContainer.getElementsByClassName('color-box'));

    if (colorBoxes.length === 0) {
        colorBoxes = Array.from({length: 6}, () => document.createElement('div'));

        colorBoxes.forEach((colorBox) => {
            colorBox.className = 'color-box';
            paletteContainer.appendChild(colorBox);
        });
    }
};

export function Colors() {

    const baseColor = {
        hue: Math.floor(Math.random() * 360),
        saturation: Math.floor(Math.random() * 101),
        lightness: Math.floor(Math.random() * 101),
    }

    
    const lockedColors = [];
    const colorBoxes = document.querySelectorAll('.color-box');

    // Update the background color of the color boxes
    colorBoxes.forEach((colorBox, index) => {
        if (colorBox.classList.contains('locked')) {
            const backgroundColor = colorBox.style.backgroundColor;
            const hsl = backgroundColor.substring(4, backgroundColor.length-1)
                .split(',')
                .map(num => Number(num));
            lockedColors[index] = { hue: hsl[0], saturation: hsl[1], lightness: hsl[2] };
        }   
    });

    // Función para generar una paleta de colores
    function generateColorPalette(baseColor, lockedColors) {
        return generateColorScheme(baseColor, lockedColors);
    }

    // Función para generar combinaciones de colores armoniosas
    function generateColorScheme(baseColor, lockedColors) {
        const colorsInScheme = [];
        const randomOffset = () => Math.floor(Math.random() * 360);

        function generateColor(baseColor, lockedColors) {
            // Calculate the average saturation and lightness of the locked colors
            let avgSaturation = 0, avgLightness = 0;
            if (lockedColors.length > 0) {
                lockedColors.forEach(color => {
                    avgSaturation += color.saturation;
                    avgLightness += color.lightness;
                });
                avgSaturation /= lockedColors.length;
                avgLightness /= lockedColors.length;
            } else {
                avgSaturation = baseColor.saturation;
                avgLightness = baseColor.lightness;
            }
        
            // Generate a new color with a random hue, and the average saturation and lightness
            let newColor = {
                hue: (baseColor.hue + Math.random() * 360) % 360,
                saturation: avgSaturation,
                lightness: avgLightness
            };
        
            return newColor;
        }
        console.log("Locked Colors lenght: ", lockedColors.length)
        // Genera el primer color de la paleta random
        // Si hay colores lockeados entonces se calcula el average
        const newBaseColor = lockedColors.length > 0 
            ? lockedColors.reduce((sum, color) => {
                return {
                    hue: sum.hue + color.hue,
                    saturation: sum.saturation + color.saturation,
                    lightness: sum.lightness + color.lightness
                };
            }, { hue: 0, saturation: 0, lightness: 0 })
            : baseColor;
        if (lockedColors.length > 0) {
            newBaseColor.hue /= lockedColors.length;
            newBaseColor.saturation /= lockedColors.length;
            newBaseColor.lightness /= lockedColors.length;
        }

        const averageSaturation = lockedColors.length > 0 
            ? Math.min(Math.max(lockedColors.reduce((sum, color) => sum + color.saturation, 0) / lockedColors.length, 20), 100)
            : Math.min(Math.max(newBaseColor.saturation, 20), 100); // Use the saturation of newBaseColor if there are no locked colors, but cap it at 100 and floor it at 20
    
        const averageLightness = lockedColors.length > 0 
            ? Math.min(Math.max(lockedColors.reduce((sum, color) => sum + color.lightness, 0) / lockedColors.length, 20), 75)
            : Math.min(Math.max(newBaseColor.lightness, 20), 75); // Use the lightness of newBaseColor if there are no locked colors, but cap it at 75 and floor it at 20

            const color6 = generateColor({ hue: Math.floor((newBaseColor.hue + 180 + randomOffset()) % 360), saturation: averageSaturation, lightness: averageLightness }, lockedColors);
            const color3 = generateColor({ hue: Math.floor((newBaseColor.hue + color6.hue + randomOffset()) / 2), saturation: averageSaturation, lightness: averageLightness }, lockedColors);
            const color2 = generateColor({ hue: Math.floor((newBaseColor.hue + color3.hue + randomOffset()) / 2), saturation: averageSaturation, lightness: averageLightness }, lockedColors);
            const color5 = generateColor({ hue: Math.floor((color6.hue + 90 + randomOffset()) / 2), saturation: averageSaturation, lightness: averageLightness }, lockedColors);
            const color4 = generateColor({ hue: Math.floor((color3.hue + color5.hue + randomOffset()) % 360), saturation: averageSaturation, lightness: averageLightness }, lockedColors);

        colorsInScheme.push(`hsl(${newBaseColor.hue}, ${averageSaturation}%, ${averageLightness}%)`);
        colorsInScheme.push(`hsl(${color2.hue}, ${color2.saturation}%, ${color2.lightness}%)`);
        colorsInScheme.push(`hsl(${color3.hue}, ${color3.saturation}%, ${color3.lightness}%)`);
        colorsInScheme.push(`hsl(${color4.hue}, ${color4.saturation}%, ${color4.lightness}%)`);
        colorsInScheme.push(`hsl(${color5.hue}, ${color5.saturation}%, ${color5.lightness}%)`);
        colorsInScheme.push(`hsl(${color6.hue}, ${color6.saturation}%, ${color6.lightness}%)`);

        return colorsInScheme;
    }

    const colorBoxesArray = Array.from(colorBoxes);

    // Generate initial color palette
    const palette = generateColorPalette(baseColor, lockedColors);
    
    // Update color elements
    const colors = colorBoxesArray.map((colorBox, index) => {
        if (colorBox.classList.contains('locked')) {
            // Use the locked color
            return lockedColors[index];
        } else {
            // Use a color from the palette
            return palette[index];
        }
    });
    
    // Apply the colors to the boxes

    colorBoxesArray.forEach((colorBox, index) => {
        colorBox.style.backgroundColor = colors[index];
    });

    colorBoxesArray.forEach((colorBox) => {
        let lockButton = colorBox.querySelector('.lock-button');
        if (!lockButton) {
            lockButton = document.createElement('button');
            lockButton.className = 'lock-button';
            colorBox.appendChild(lockButton);
        }
    });
    console.log("Colors: ", colors)
};