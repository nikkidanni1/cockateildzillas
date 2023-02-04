import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import type { RootState } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'components/base/Slider'
import Settings from '@mui/icons-material/Settings'
import VolumeMute from '@mui/icons-material/VolumeMute'
import VolumeUp from '@mui/icons-material/VolumeUp'
import MusicNote from '@mui/icons-material/MusicNote'
import MusicOff from '@mui/icons-material/MusicOff'
import IconButton from 'components/base/IconButton'
import { ButtonVariant } from 'helpers/enums'
import ModalBase from 'components/view/ModalBase'
import { setMusicVolume, setSoundVolume } from 'store/actions'
import styles from './AppSettingsModal.module.scss'

const audioUrl = '/sounds/button-sound-primary.mp3'

const AppSettingsModal: React.FC = () => {
    const dispatch = useDispatch()

    const musicVolume: number = useSelector((state: RootState) => state.musicVolume)
    const soundVolume: number = useSelector((state: RootState) => state.soundVolume)

    const [isOpen, setOpen] = useState<boolean>(false)
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
    const [stateMusicVolume, setStateMusicVolume] = useState<number>(musicVolume)
    const [stateSoundVolume, setStateSoundVolume] = useState<number>(soundVolume)

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
        if (audio) {
            audio.volume = value
            audio.currentTime = 0
            audio?.play()
            dispatch(setSoundVolume(value))
        }
    }, [dispatch, audio])

    const toggleModal = useCallback(() => {
        setOpen(prev => !prev)
    }, [])

    return (
        <>
            <ModalBase
                isOpen={isOpen}
                onClose={toggleModal}
                title="Настройки"
            >
                <div className={styles.sliderWrapper}>
                    <MusicOff />
                    <Slider
                        aria-label="Volume"
                        value={stateMusicVolume}
                        onChange={onChangeMusicVolume}
                        onChangeCommitted={onChangeCommittedMusicVolume}
                        step={0.05}
                        min={0}
                        max={1}
                        valueLabelDisplay="off"
                    />
                    <MusicNote />
                </div>
                <div className={styles.sliderWrapper}>
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
                        valueLabelDisplay="off"
                    />
                    <VolumeUp />
                </div>
            </ModalBase>
            <IconButton
                onClick={toggleModal}
                variant={isOpen ? ButtonVariant.Primary : ButtonVariant.Secondary}
            >
                <Settings />
            </IconButton>
        </>
    )
}

export default AppSettingsModal