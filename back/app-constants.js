const APP_CONSTANTS = {
    maxPasswordLength: 32,
    minPasswordLength: 6,
    maxName: 32,
    cockateilParts: {
        bodyCockateil: {
            name: 'Тулувище воина',
            colorVariants: [
                '#332525',
                '#bea638',
                '#96906c'
            ],
            shades: ['main_color', 'color_light1', 'color_dark1', 'color_outline']
        },
        headCockateil: {
            name: 'Голова война',
            colorVariants: [
                '#bea638',
            ],
            shades: ['main_color', 'color_dark1', 'color_outline']
        },
        cheeksCockateil: {
            name: 'Щеки война',
            colorVariants: [
                '#8c2a05',
            ],
            shades: ['main_color', 'color_dark1']
        }
    },
    cockateilAppearanceDataDefault: {
        bodyCockateil: {
            main_color: '#332525'
        },
        headCockateil: {
            main_color: '#bea638'
        },
        cheeksCockateil: {
            main_color: '#8c2a05'
        }
    },
    cockateilAppearanceParts: ['bodyCockateil', 'headCockateil', 'cheeksCockateil']
}

module.exports = APP_CONSTANTS