import React, { useCallback, useMemo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IconButton } from '@material-ui/core'

const CustomIconButton = ({ children, onClick, isActive, ...props }) => {
    const audioUrl = useMemo(() => (
        isActive ? '/button-sound-secondary.mp3' : '/button-sound-primary.mp3'
    ), [isActive])

    const volume = useSelector(state => state.soundVolume)

    const [audio, setAudio] = useState(null)

    useEffect(() => {
        setAudio(new Audio(audioUrl))
    }, [audioUrl])

    const handleClick = useCallback((e) => {
        if (onClick) {
            onClick(e)
        }
        audio.volume = volume
        audio.currentTime = 0
        audio?.play()
    }, [onClick, audio, volume])
    return (
        <IconButton
            onClick={handleClick}
            {...props}
        >
            {children}
        </IconButton>
    )
}

export default CustomIconButton