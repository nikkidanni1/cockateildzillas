import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import type { RootState } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import MusicOff from '@mui/icons-material/MusicOff'
import MusicNote from '@mui/icons-material/MusicNote'
import LogoutIcon from '@mui/icons-material/ExitToApp'
import CloseIcon from '@mui/icons-material/Close'
import { Snackbar, SnackbarContent } from '@mui/material'
import HousesBackDecor from 'components/view/HousesBackDecor'
import FlyingBirds from 'components/view/FlyingBirds'
import IconButton from 'components/base/IconButton'
import { ButtonVariant } from 'helpers/enums'
import AppSettingsModal from 'components/partial/AppSettingsModal'
import { setMusicVolume, setUserInfo, setError, setNotifyMessage } from 'store/actions'
import LoadingComponent from 'components/view/LoadingComponent'
import styles from './Layout.module.scss'

enum ActionType {
    Error,
    Info
}

const audioUrl: string = '/sounds/cockatieldzillas-main.mp3'

const Layout: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const volume: number = useSelector((state: RootState) => state.musicVolume)
    const appLoading: boolean = useSelector((state: RootState) => state.appLoading)
    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
    const error: string = useSelector((state: RootState) => state.error)
    const notifyMessage: string = useSelector((state: RootState) => state.notifyMessage)

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
        localStorage.removeItem('auth')
        dispatch(setUserInfo(null))
        navigate('/login')
    }, [])

    const hideNotifyError = useCallback(() => {
        dispatch(setError(''))
    }, [dispatch])

    const hideNotifyInfo = useCallback(() => {
        dispatch(setNotifyMessage(''))
    }, [dispatch])

    const action: React.FC<ActionType> = (type) => (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={type === ActionType.Error ? hideNotifyError : hideNotifyInfo}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    )

    return (
        <div className={styles.root}>
            {(appLoading) && (
                <LoadingComponent />
            )}
            <HousesBackDecor />
            <FlyingBirds />
            <p className={styles.title}>
                <span>COCKATIEL</span>
                <span>DZILLAS</span>
            </p>
            <div className={styles.root__children}>
                <Outlet />
            </div>
            <div className={styles.settings}>
                <AppSettingsModal />
                <IconButton
                    variant={volume !== 0 ? ButtonVariant.Primary : ButtonVariant.Secondary}
                    onClick={toggleMusic}
                >
                    {volume === 0 ? <MusicNote /> : <MusicOff />}
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
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={hideNotifyError}
            >
                <SnackbarContent
                    className={styles.snackError}
                    action={action(ActionType.Error)}
                    aria-describedby="error"
                    message={error}
                />
            </Snackbar>
            <Snackbar
                open={!!notifyMessage}
                autoHideDuration={6000}
                onClose={hideNotifyInfo}
            >
                <SnackbarContent
                    action={action(ActionType.Info)}
                    aria-describedby="info"
                    message={notifyMessage}
                />
            </Snackbar>
        </div>
    )
}

export default Layout