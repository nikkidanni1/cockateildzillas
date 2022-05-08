import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        display: 'flex',
        width: '100%',
        height: '50px',
    }
})

const ControlHeader = ({ title }) => {
    const classes = useStyles()
    return (
        <header className={classes.root}>
            {title}
        </header>
    )
}

export default ControlHeader