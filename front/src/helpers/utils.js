const rgbToHsl = (red, green, blue) => {
    let r = red / 255
    let g = green / 255
    let b = blue / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min
    let h

    switch (max) {
        case min: {
            h = 0
            break
        }
        case r: {
            h = 60 * (((g - b) / delta) % 6)
            break
        }
        case g: {
            h = 60 * ((b - r) / delta + 2)
            break
        }
        case b: {
            h = 60 * ((r - g) / delta + 4)
            break
        }
        default: { }
    }
    let l = (max + min) / 2
    let s = delta ? delta / (1 - Math.abs(2 * l - 1)) : 0
    l *= 100
    s *= 100
    return [h, s, l]
}

export const createSubColors = (main_color, shades = []) => {
    const red = parseInt(main_color.replace(/#(.{2}).{4}/i, '$1'), 16)
    const green = parseInt(main_color.replace(/#.{2}(.{2}).{2}/i, '$1'), 16)
    const blue = parseInt(main_color.replace(/#.{4}(.{2})/i, '$1'), 16)
    const hsl = rgbToHsl(red, green, blue)

    const resultObject = {}

    shades.forEach(shade => {
        switch (shade) {
            case 'main_color': {
                resultObject[shade] = main_color
                break
            }
            case 'color_light1': {
                resultObject[shade] = `hsl(${hsl[0] + 5},${Math.round(hsl[1]) - 10}%,${Math.round(hsl[2]) + 25}%)`
                break
            }
            case 'color_dark1': {
                resultObject[shade] = `hsl(${hsl[0] - 15},${Math.round(hsl[1]) }%,${Math.round(hsl[2]) - 12}%)`
                break
            }
            case 'color_outline': {
                resultObject[shade] = `hsl(${hsl[0] - 20},${Math.round(hsl[1]) + 10}%,${Math.round(hsl[2]) - 25}%)`
                break
            }
            default: {}
        }
    })
    
    
    return resultObject
}