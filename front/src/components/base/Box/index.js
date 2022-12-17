import React from 'react'
import { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    box: {
        position: 'relative',
        boxSizing: 'border-box',
        minWidth: 'max-content',
        padding: '24px',
        backgroundColor: 'rgba(45,50,70,.75)',
        boxShadow: `-8px 0 0 0 black,
                    8px 0 0 0 black,
                    0 -8px 0 0 black,
                    0 8px 0 0 black`,
        [theme.breakpoints.down('xs')]: {
            width: 'calc(95% - 16px) !important'
        }
    },
    title: {
        fontFamily: 'MultiTypePixel',
        color: 'rgba(255,255,255,0.53)',
        fontSize: '2rem',
        marginBottom: '1rem'
    }
}))

const Box = forwardRef(({ children, className, title, classNameTitle = '', ...props }, ref) => {
    const classes = useStyles()
    return (
        <div
            {...props}
            className={`${classes.box} ${className}`}
            ref={ref}
        >
            {title && (
                <header
                    className={`${classes.title} ${classNameTitle}`}
                >
                    {title}
                </header>
            )}
            {children}
        </div>
    )
})

export default Box