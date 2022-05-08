import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    box: {
        position: 'relative',
        boxSizing: 'border-box',
        padding: '24px',
        backgroundColor: 'rgb(45,50,70)',
        boxShadow: `-8px 0 0 0 black,
                    8px 0 0 0 black,
                    0 -8px 0 0 black,
                    0 8px 0 0 black`,
        '&:after': {
            position: 'absolute',
            top: 16,
            left: -16,
            zIndex: -1,
            content: "''",
            width: '100%',
            height: '100%',
            background: 'rgb(13,12,26)'
        }
    },
    title: {
        fontFamily: 'MultiTypePixel',
        color: 'rgba(255,255,255,0.53)',
        fontSize: '2rem',
        marginBottom: '1rem'
    }
})

const Box = ({ children, className, title, customHeader }) => {
    const classes = useStyles()
    return (
        <div className={`${classes.box} ${className}`}>
            {title && (
                <div className={classes.title}>
                    {title}
                </div>
            )}
            {children}
        </div>
    )
}

export default Box