import React from 'react'
import { useCallback, useMemo, useEffect, useState } from 'react'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import { ButtonVariant } from 'helpers/enums'

type Props = {
   variant?: ButtonVariant
} & Omit<React.ComponentProps<typeof IconButton>, 'variant'>

const CustomIconButton: React.FC<Props> = ({ children, onClick, variant = ButtonVariant.Secondary, ...props }) => {
    const audioUrl = useMemo(() => (
        variant === ButtonVariant.Secondary ? '/button-sound-secondary.mp3' : '/button-sound-primary.mp3'
    ), [variant])

    const volume = useSelector((state: RootState) => state.soundVolume)

    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

    useEffect(() => {
        setAudio(new Audio(audioUrl))
    }, [audioUrl])

    const handleClick = useCallback((e) => {
        if (onClick) {
            onClick(e)
        }
        if (audio) {
            audio.volume = volume
            audio.currentTime = 0
            audio.play()
        }
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