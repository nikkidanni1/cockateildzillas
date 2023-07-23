const APP_CONSTANTS = {
    maxPasswordLength: 32,
    minPasswordLength: 6,
    maxName: 32,
    cockatielPartInfo: {
        bodyCockatiel: {
            name: 'Тулувище воина',
            colorVariants: [
                '#3c2020',
            ],
            shades: ['main_color', 'color_light1', 'color_dark1', 'color_outline']
        },
        headCockatiel: {
            name: 'Голова воина',
            colorVariants: [
                '#af886c',
            ],
            shades: ['main_color', 'color_dark1', 'color_outline']
        },
        cheeksCockatiel: {
            name: 'Щеки воина',
            colorVariants: [
                '#9a3e28',
            ],
            shades: ['main_color', 'color_dark1']
        }
    },
    cockatielAppearanceDataDefault: {
        bodyCockatiel: {
            main_color: '#3c2020'
        },
        headCockatiel: {
            main_color: '#af886c'
        },
        cheeksCockatiel: {
            main_color: '#9a3e28'
        }
    },
    cockatielPartNames: ['bodyCockatiel', 'headCockatiel', 'cheeksCockatiel'],
    maxHealth: 100,
}

export default APP_CONSTANTS