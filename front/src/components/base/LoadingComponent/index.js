import * as React from 'react'
import { CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        top: 10,
        left: 10,
    }
})

const LoadingComponent = () => {
    const classes = useStyles()
    return (
        <CircularProgress className={classes.root} />
    )
}

export default LoadingComponent