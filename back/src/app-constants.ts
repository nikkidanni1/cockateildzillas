const APP_CONSTANTS = {
    maxPasswordLength: 32,
    minPasswordLength: 6,
    maxName: 32,
    cockatielPartInfo: {
        bodyCockatiel: {
            name: 'Тулувище воина',
            colorVariants: [
                '#3c2020',
                '#a79a91',
                '#675b70'
            ],
            shades: ['main_color', 'color_light1', 'color_dark1', 'color_outline']
        },
        headCockatiel: {
            name: 'Голова воина',
            colorVariants: [
                '#baa280',
            ],
            shades: ['main_color', 'color_dark1', 'color_outline']
        },
        cheeksCockatiel: {
            name: 'Щеки воина',
            colorVariants: [
                '#8c2a05',
            ],
            shades: ['main_color', 'color_dark1']
        }
    },
    cockatielAppearanceDataDefault: {
        bodyCockatiel: {
            main_color: '#3c2020'
        },
        headCockatiel: {
            main_color: '#baa280'
        },
        cheeksCockatiel: {
            main_color: '#8c2a05'
        }
    },
    cockatielPartNames: ['bodyCockatiel', 'headCockatiel', 'cheeksCockatiel']
}

export default APP_CONSTANTS