import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Slider as MSlider } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        color: 'rgb(154,159,168)',
    },
    track: {
        height: 6
    },
    rail: {
        height: 6
    },
    thumb: {
        width: 16,
        height: 16,
        marginTop: -5
    },
    markLabelActive: {
        left: 'unset'
    }
})

const Slider = (props) => {
    const classes = useStyles()
    return (
        <MSlider
            {...props}
            classes={{
                root: classes.root,
                track: classes.track,
                rail: classes.rail,
                thumb: classes.thumb,
                valueLabel: classes.markLabelActive
            }}
            size="medium"
            valueLabelDisplay="auto"
        />
    )
}

export default Slider