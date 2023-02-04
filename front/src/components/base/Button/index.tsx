import React from 'react'
import { useState, useCallback, useEffect, useMemo } from 'react'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import styles from './Button.module.scss'
import { ButtonVariant } from 'helpers/enums'

type Props = {
    className?: string,
    size?: string,
    variant?: ButtonVariant,
} & Omit<React.ComponentProps<typeof Button>, 'variant'>

const CustomButton: React.FC<Props> = ({ 
    className, 
    size = 'large', 
    children, 
    onClick, 
    variant = ButtonVariant.Secondary, 
    ...props 
}) => {
    const audioUrl: string = useMemo(() => (
        (variant === ButtonVariant.Primary) ? '/sounds/button-sound-primary.mp3' : '/sounds/button-sound-secondary.mp3'
    ), [variant])

    const volume: number = useSelector((state: RootState) => state.soundVolume)

    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

    useEffect(() => {
        setAudio(new Audio(audioUrl))
    }, [audioUrl])

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(e => {
        if (onClick) {
            onClick(e)
        }
        if (audio) {
            audio.currentTime = 0
            audio.volume = volume
            audio?.play()
        }
    }, [onClick, audio, volume])

    return (
        <Button
            className={
                `${className} ${styles.button} ${
                    variant === ButtonVariant.Secondary ? styles.button_secondary : ''
                } ${
                    size === 'large' ? styles.button_large : ''
                }`
            }
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