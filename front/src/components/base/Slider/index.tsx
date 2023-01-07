import React from 'react'
import { Slider as MSlider } from '@mui/material'
import styles from './Slider.module.scss'

const Slider: React.FC<React.ComponentProps<typeof MSlider>> = (props) => {
    return (
        <MSlider
            size="medium"
            valueLabelDisplay="auto"
            {...props}
            classes={{
                root: styles.root,
                track: styles.track,
                rail: styles.rail,
                thumb: styles.thumb,
                valueLabel: styles.markLabelActive
            }}
        />
    )
}

export default Slider