const rgbToHsl = (red: number, green: number, blue: number): [number, number, number] => {
    let r: number = red / 255
    let g: number = green / 255
    let b: number = blue / 255
    const max: number = Math.max(r, g, b)
    const min: number = Math.min(r, g, b)
    const delta: number = max - min
    let h: number = 0

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
    let l: number = (max + min) / 2
    let s: number = delta ? delta / (1 - Math.abs(2 * l - 1)) : 0
    l *= 100
    s *= 100
    return [h, s, l]
}

export const createSubColors = (main_color: string, shades: Array<CockatielShades>): CockatielAppearancePart => {
    const red: number = parseInt(main_color.replace(/#(.{2}).{4}/i, '$1'), 16)
    const green: number = parseInt(main_color.replace(/#.{2}(.{2}).{2}/i, '$1'), 16)
    const blue: number = parseInt(main_color.replace(/#.{4}(.{2})/i, '$1'), 16)
    const hsl: [number, number, number] = rgbToHsl(red, green, blue)

    const resultObject: CockatielAppearancePart = { main_color }

    shades.forEach(shade => {
        switch (shade) {
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