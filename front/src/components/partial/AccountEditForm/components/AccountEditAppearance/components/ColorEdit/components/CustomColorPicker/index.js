import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Slider from 'components/base/Slider'

const useStyles = makeStyles({
    slidersWrapper: {
        paddingRight: 12
    },
    sliderWrapper: {
        display: 'grid',
        gridTemplateColumns: '55px 200px',
        alignItems: 'center',
        width: '100%'
    },
    sliderTitle: {
        fontFamily: 'monospace',
        textTransform: 'capitalize',
        color: 'rgba(255,255,255,0.83)'
    }
})

const ColorSlider = ({ channel, value, onChange }) => {
    const classes = useStyles()
    return (
        <div className={classes.sliderWrapper}>
            <Typography className={classes.sliderTitle}>
                {channel}
            </Typography>
            <Slider
                aria-label={channel}
                value={value}
                onChange={onChange}
                step={1}
                min={0}
                max={255}
            />
        </div>
    )
}

const CustomColorPicker = ({ customColor, setCustomColor, onChangeAppearanceData }) => {
    const classes = useStyles()

    const onChangeSlider = useCallback((channel) => (e, value) => {
        let newColor
        switch (channel) {
            case 'red': {
                newColor = customColor.replace(/(#).{2}(.{4})/i, `$1${value.toString(16).padStart( 2, '0')}$2`)
                console.log(newColor, 'newColor')
                break
            }
            case 'green': {
                newColor = customColor.replace(/(#.{2}).{2}(.{2})/i, `$1${value.toString(16).padStart( 2, '0')}$2`)
                break
            }
            case 'blue': {
                newColor = customColor.replace(/(#.{4}).{2}/i, `$1${value.toString(16).padStart( 2, '0')}`)
                break
            }
            default: {}
        }
        setCustomColor(newColor)
        onChangeAppearanceData(newColor)
    }, [customColor, setCustomColor])

    return (
        <div className={classes.slidersWrapper}>
            <ColorSlider
                value={parseInt(customColor.replace(/#(.{2}).{4}/i, '$1'), 16)}
                channel="red"
                onChange={onChangeSlider('red')}
            />
            <ColorSlider
                value={parseInt(customColor.replace(/#.{2}(.{2}).{2}/i, '$1'), 16)}
                channel="green"
                onChange={onChangeSlider('green')}
            />
            <ColorSlider
                value={parseInt(customColor.replace(/#.{4}(.{2})/i, '$1'), 16)}
                channel="blue"
                onChange={onChangeSlider('blue')}
            />
        </div>
    )
}

export default CustomColorPicker