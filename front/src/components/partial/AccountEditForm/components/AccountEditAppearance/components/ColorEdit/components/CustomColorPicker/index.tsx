import React from 'react'
import { useCallback } from 'react'
import { Typography } from '@mui/material'
import Slider from 'components/base/Slider'
import styles from './CustomColorPicker.module.scss'

type SliderProps = {
    channel: string,
} & React.ComponentProps<typeof Slider>

const ColorSlider: React.FC<SliderProps> = ({ channel, value, onChange }) => {
    return (
        <div className={styles.sliderWrapper}>
            <Typography className={styles.sliderTitle}>
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

type Props = {
    customColor: string,
    setCustomColor:  React.Dispatch<React.SetStateAction<string>>,
    onChangeAppearanceData: (color: string) => void
}

const CustomColorPicker: React.FC<Props> = ({ customColor, setCustomColor, onChangeAppearanceData }) => {
    const onChangeSlider = useCallback((channel: string) => (e, value) => {
        let newColor: string = ''
        switch (channel) {
            case 'red': {
                newColor = customColor.replace(/(#).{2}(.{4})/i, `$1${value.toString(16).padStart( 2, '0')}$2`)
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
        <div className={styles.slidersWrapper}>
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