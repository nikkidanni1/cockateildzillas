import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Slider } from '@material-ui/core'
import Settings from '@material-ui/icons/Settings'
import VolumeMute from '@material-ui/icons/VolumeMute'
import VolumeUp from '@material-ui/icons/VolumeUp'
import MusicNote from '@material-ui/icons/MusicNote'
import MusicOff from '@material-ui/icons/MusicOff'
import IconButton from '../IconButton'
import ModalBase from '../ModalBase'
import { setMusicVolume, setSoundVolume } from '../../store/actions'

const useStyles = makeStyles({
    sliderWrapper: {
        display: 'grid',
        gridTemplateColumns: '2.25rem 1fr 2.75rem',
        columnGap: '0.5rem',
        alignItems: 'center',
        marginBottom: '16px',
        '& svg': {
            width: '2rem',
            height: '2rem',
            color: 'rgba(255,255,255,0.53)',
        },
        '& .MuiSlider-root': {
            color: 'rgb(154,159,168)',
        },
        '& .MuiSlider-rail, & .MuiSlider-track': {
            height: 6
        },
        '& .MuiSlider-thumb': {
            width: 16,
            height: 16,
            marginTop: -5
        }
    }
})

const audioUrl = '/button-sound-primary.mp3'

const AppSettingsModal = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const musicVolume = useSelector(state => state.musicVolume)
    const soundVolume = useSelector(state => state.soundVolume)

    const [isOpen, setOpen] = useState(false)
    const [audio, setAudio] = useState(null)
    const [stateMusicVolume, setStateMusicVolume] = useState(musicVolume)
    const [stateSoundVolume, setStateSoundVolume] = useState(soundVolume)

    useEffect(() => {
        setAudio(new Audio(audioUrl))
    }, [])

    useEffect(() => {
        setStateSoundVolume(soundVolume)
    }, [soundVolume])

    useEffect(() => {
        setStateMusicVolume(musicVolume)
    }, [musicVolume])

    const onChangeMusicVolume = useCallback((e, value) => {
        setStateMusicVolume(value)
    }, [])

    const onChangeSoundVolume = useCallback((e, value) => {
        setStateSoundVolume(value)
    }, [])

    const onChangeCommittedMusicVolume = useCallback((e, value) => {
        dispatch(setMusicVolume(value))
    }, [dispatch])

    const onChangeCommittedSoundVolume = useCallback((e, value) => {
        audio.volume = value
        audio.currentTime = 0
        audio?.play()
        dispatch(setSoundVolume(value))
    }, [dispatch, audio])

    const toggleModal = useCallback(() => {
        setOpen(prev => !prev)
    }, [])

    return (
        <>
            <ModalBase
                isOpen={isOpen}
                onClose={toggleModal}
            >
                <div className={classes.sliderWrapper}>
                    <MusicOff />
                    <Slider
                        size="medium"
                        aria-label="Volume"
                        value={stateMusicVolume}
                        onChange={onChangeMusicVolume}
                        onChangeCommitted={onChangeCommittedMusicVolume}
                        step={0.05}
                        min={0}
                        max={1}
                    />
                    <MusicNote />
                </div>
                <div className={classes.sliderWrapper}>
                    <VolumeMute />
                    <Slider
                        size="medium"
                        aria-label="Volume"
                        value={stateSoundVolume}
                        onChange={onChangeSoundVolume}
                        onChangeCommitted={onChangeCommittedSoundVolume}
                        step={0.05}
                        min={0}
                        max={1}
                    />
                    <VolumeUp />
                </div>
            </ModalBase>
            <IconButton
                onClick={toggleModal}
                isActive={isOpen}
            >
                <Settings />
            </IconButton>
        </>
    )
}

export default AppSettingsModal