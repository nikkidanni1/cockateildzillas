import React from 'react'
import { useEffect, useState, useMemo, useCallback } from 'react'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import { Tabs as MTabs, Tab } from '@mui/material'
import styles from './Tabs.module.scss'

type Props = {
    className: string,
    value: string,
    onChange: (e: React.SyntheticEvent, value: any) => void,
    tabs: Array<TabItem<any>>
}

const Tabs: React.FC<Props> = ({ className, value, onChange, tabs = [] }) => {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

    const volume = useSelector((state: RootState) => state.soundVolume)
    const audioUrl: string = useMemo(() => (
        '/sounds/button-sound-primary.mp3'
    ), [])

    useEffect(() => {
        setAudio(new Audio(audioUrl))
    }, [audioUrl])

    const handleClick = useCallback(e => {
        if (audio) {
            audio.currentTime = 0
            audio.volume = volume
            audio?.play()
        }
    }, [audio, volume])

    return (
        <MTabs
            className={`${className} ${styles.tabs}`}
            value={value}
            onChange={onChange}
        >
            {tabs.map(item => (
                <Tab
                    key={item.label}
                    className={styles.tab}
                    onClick={handleClick}
                    value={item.value}
                    label={item.label}
                />
            ))}
        </MTabs>
    )
}

export default Tabs