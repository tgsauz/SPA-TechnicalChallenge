export function initializeColors() {
    let paletteContainer = document.querySelector('.palette-container');
    const mainContainer = document.getElementById('main-content');

    if (!paletteContainer) {
        paletteContainer = document.createElement('div');
        paletteContainer.className = 'palette-container';
        mainContainer.appendChild(paletteContainer);
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
        name: ''
    }
    
    baseColor.name = getColorName(baseColor.hue, baseColor.saturation, baseColor.lightness)
    
    const lockedColors = [];
    const colorBoxes = document.querySelectorAll('.color-box');

    // Función para generar una paleta de colores
    function generateColorPalette(baseColor, lockedColors) {
        return generateColorScheme(baseColor, lockedColors);
    }

    // Función para generar combinaciones de colores armoniosas
    function generateColorScheme(baseColor, lockedColors) {
        const colorsInScheme = [];
        const randomOffset = () => Math.floor(Math.random() * 360);

        function generateColor(baseColor, lockedColors) {
            let avgColor = baseColor;
        
            // If there are locked colors, calculate the average hue, saturation, and lightness
            if (lockedColors.length > 0) {
                const totalColor = lockedColors.reduce((sum, color) => {
                    return {
                        hue: sum.hue + color.hue,
                        saturation: sum.saturation + color.saturation,
                        lightness: sum.lightness + color.lightness,
                    };
                }, { hue: 0, saturation: 0, lightness: 0 });
        
                avgColor = {
                    hue: totalColor.hue / lockedColors.length,
                    saturation: totalColor.saturation / lockedColors.length,
                    lightness: totalColor.lightness / lockedColors.length,
                };
            }
        
            // Generate a new color with a random hue, and the average saturation and lightness
            let newColor = {
                hue: (avgColor.hue + Math.random() * 360) % 360,
                saturation: avgColor.saturation,
                lightness: avgColor.lightness,
            };
        
            return newColor;
        }
        // Genera el primer color de la paleta random
        // Si hay colores lockeados entonces se calcula el average
        let totalColor = lockedColors.reduce((sum, color) => {
            return {
                hue: sum.hue + color.hue,
                saturation: sum.saturation + color.saturation,
                lightness: sum.lightness + color.lightness,
            };
        }, { hue: 0, saturation: 0, lightness: 0, name: ''});
        console.log("totalColor: ", totalColor)
        console.log("lockedColors Lenght: ", lockedColors.length)

        const newBaseColor = lockedColors.length > 0 
            ? lockedColors.reduce((sum, color) => {
                return {
                    hue: sum.hue + color.hue,
                    saturation: sum.saturation + color.saturation,
                    lightness: sum.lightness + color.lightness,
                };
            }, { hue: 0, saturation: 0, lightness: 0, name: ''})
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
            const color4 = generateColor({ hue: Math.floor((color3.hue + color6.hue + randomOffset()) % 360), saturation: averageSaturation, lightness: averageLightness }, lockedColors);
            const color5 = generateColor({ hue: Math.floor((color6.hue + color4.hue + randomOffset()) / 2), saturation: averageSaturation, lightness: averageLightness }, lockedColors);

        colorsInScheme.push({hue: Math.floor(newBaseColor.hue), saturation: averageSaturation, lightness: averageLightness});
        colorsInScheme.push({hue: Math.floor(color2.hue), saturation: color2.saturation, lightness: color2.lightness});
        colorsInScheme.push({hue: Math.floor(color3.hue), saturation: color3.saturation, lightness: color3.lightness});
        colorsInScheme.push({hue: Math.floor(color4.hue), saturation: color4.saturation, lightness: color4.lightness});
        colorsInScheme.push({hue: Math.floor(color5.hue), saturation: color5.saturation, lightness: color5.lightness});
        colorsInScheme.push({hue: Math.floor(color6.hue), saturation: color6.saturation, lightness: color6.lightness});

        return colorsInScheme;
    }

    const colorBoxesArray = Array.from(colorBoxes);

    // Generate initial color palette
    const palette = colorBoxesArray.map((colorBox, index) => {
        if (colorBox.classList.contains('locked')) {
            return lockedColors[index];
        } else {
            return generateColorPalette(baseColor, lockedColors)[index];
        }
    });

    colorBoxesArray.forEach((colorBox, index) => {
        if (!colorBox.classList.contains('locked')) {
            let hslColor= `hsl(${palette[index].hue}, ${palette[index].saturation}%, ${palette[index].lightness}%)`;
            colorBox.style.backgroundColor = hslColor
            getColorName(palette[index].hue, palette[index].saturation, palette[index].lightness)
            .then(name => {
                colorBox.querySelector('.color-name').textContent = name;
            });
        }
    });

    // Actualizar los colores de los cuadros
    const colors = colorBoxesArray.map((colorBox, index) => {
        return palette[index];
    });

    colorBoxes.forEach((colorBox, index) => {
        if (colorBox.classList.contains('locked')) {
            palette[index] = lockedColors[index];
        }
    });

    
    // Guardar los colores lockeados
    colorBoxes.forEach((colorBox, index) => {
        if (colorBox.classList.contains('locked')) {
            const backgroundColor = colorBox.style.backgroundColor;
            const hsl = backgroundColor.substring(4, backgroundColor.length-1)
                .split(',')
                .map(num => Number(num));
            lockedColors[index] = { hue: hsl[0], saturation: hsl[1], lightness: hsl[2], name: colorBox.querySelector('.color-name').textContent};
        }
        console.log("hue value: ", colorBox.style.backgroundColor)
    });

    // Función para obtener el nombre del color usando api
    function getColorName(h, s, l){
        return fetch(`http://www.thecolorapi.com/id?hsl=${h},${s},${l}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        
        })
        .then(response => response.json())
        .then(data => data.name.value)
        .catch(error => {
            console.error('Error:', error);
            return 'Unknown';
        });
    }
    
    //Aplicar colores  y nombres a los cuadros
    colorBoxesArray.forEach((colorBox, index) => {
        if (colors[index]) {
            let hslColor= `hsl(${colors[index].hue}, ${colors[index].saturation}%, ${colors[index].lightness}%)`;
            colorBox.style.backgroundColor = hslColor
            getColorName(colors[index].hue, colors[index].saturation, colors[index].lightness)
            .then(name => {
                colorBox.querySelector('.color-name').textContent = name;
            });
        }
    });

    // Agregar botones de lock
    colorBoxesArray.forEach((colorBox) => {
        let colorName = colorBox.querySelector('.color-name');
        if (!colorName) {
            colorName = document.createElement('span');
            colorName.className = 'color-name';
            colorBox.appendChild(colorName);
        }
        let lockButton = colorBox.querySelector('.lock-button');
        if (!lockButton) {
            lockButton = document.createElement('button');
            lockButton.className = 'lock-button';
            colorBox.appendChild(lockButton);
        }
    });
};