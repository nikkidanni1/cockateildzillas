import React, { useMemo } from 'react'
import { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {  Button } from '@material-ui/core'

const useStyles = makeStyles({
    button: {
        width: '100%',
        margin: '4px 0 4px',
        color: 'rgba(0, 0, 0, 0.87)',
        background: 'rgb(170,170,170)',
        '&:hover': {
            background: 'rgb(200,200,200)',
        }
    },
    buttonSecondary: {
        color: '#fff',
        background: 'rgb(80,50,70)',
        '&:hover': {
            background: 'rgb(90,60,80)',
        }
    },
})

const CustomButton = ({ color, children, onClick, isActive, ...props }) => {
    const classes = useStyles()
    const audioUrl = useMemo(() => (
        (color === 'secondary' || !isActive) ? '/button-sound-secondary.mp3' : '/button-sound-primary.mp3'
    ), [color, isActive])

    const volume = useSelector(state => state.soundVolume)

    const [audio, setAudio] = useState(null)

    useEffect(() => {
        setAudio(new Audio(audioUrl))
    }, [audioUrl])

    const handleClick = useCallback(e => {
        if (onClick) {
            onClick(e)
        }
        audio.currentTime = 0
        audio.volume = volume
        audio?.play()
    }, [onClick, audio, volume])
    
    return (
        <Button
            className={`${classes.button} ${color === 'secondary' ? classes.buttonSecondary : ''}`}
            variant="contained"
            color="secondary"
            onClick={handleClick}
            {...props}
        >
            {children}
        </Button>
    )
}

export default CustomButton