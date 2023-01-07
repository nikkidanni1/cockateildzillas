import React from 'react'
import type { ReactChild } from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import type { RootState } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import MusicOff from '@mui/icons-material/MusicOff'
import MusicNote from '@mui/icons-material/MusicNote'
import LogoutIcon from '@mui/icons-material/ExitToApp'
import HousesBackDecor from 'components/view/HousesBackDecor'
import FlyingBirds from 'components/view/FlyingBirds'
import IconButton from 'components/base/IconButton'
import { ButtonVariant } from 'helpers/enums'
import AppSettingsModal from 'components/partial/AppSettingsModal'
import { setMusicVolume } from 'store/actions'
import styles from './Layout.module.scss'

const audioUrl: string = '/cockateildzillas-main.mp3'

const Layout: React.FC = ({ children }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const volume: number = useSelector((state: RootState) => state.musicVolume)
    const appLoading: boolean = useSelector((state: RootState) => state.appLoading)
    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)

    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

    useEffect(() => {
        setAudio(new Audio(audioUrl))
    }, [])

    useEffect(() => {
        if (audio) {
            audio.loop = true
            audio.volume = volume
            audio.play()
        }
    }, [audio, volume])

    const toggleMusic = useCallback(() => {
        dispatch(setMusicVolume(volume !== 0 ? 0 : 0.5))
    }, [volume, dispatch])

    const onLogout = useCallback(() => {
        history.push('/login')
    }, [])

    return (
        <div className={styles.root}>
            <HousesBackDecor />
            <FlyingBirds />
            <p className={styles.title}>
                <span>COCKATEIL</span>
                <span>DZILLAS</span>
            </p>
            <div className={styles.root__children}>
                {children}
            </div>
            <div className={styles.settings}>
                <AppSettingsModal />
                <IconButton
                    variant={volume !== 0 ? ButtonVariant.Primary : ButtonVariant.Secondary}
                    onClick={toggleMusic}
                >
                    {volume === 0 ? <MusicOff /> : <MusicNote />}
                </IconButton>
                {(!appLoading && userInfo) && (
                    <IconButton
                        variant={ButtonVariant.Secondary}
                        onClick={onLogout}
                    >
                        <LogoutIcon />
                    </IconButton>
                )}
            </div>
        </div>
    )
}

export default Layout