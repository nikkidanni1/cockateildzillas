import React from 'react'
import { useEffect, useState, useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Tabs as MTabs, Tab } from '@material-ui/core'

const Tabs = ({ className, value, onChange, tabs = [] }) => {
    const [audio, setAudio] = useState(null)

    const volume = useSelector(state => state.soundVolume)
    const audioUrl = useMemo(() => (
        '/button-sound-primary.mp3'
    ), [])

    useEffect(() => {
        setAudio(new Audio(audioUrl))
    }, [audioUrl])

    const handleClick = useCallback(e => {
        audio.currentTime = 0
        audio.volume = volume
        audio?.play()
    }, [audio, volume])

    return (
        <MTabs
            className={className}
            value={value}
            onChange={onChange}
        >
            {tabs.map(item => (
                <Tab
                    onClick={handleClick}
                    value={item.value}
                    label={item.label}
                />
            ))}
        </MTabs>
    )
}

export default Tabs