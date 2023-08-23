import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import type { RootState, AppDispatch } from 'store'
import { useDispatch, useSelector } from 'react-redux'
import MusicOff from '@mui/icons-material/MusicOff'
import MusicNote from '@mui/icons-material/MusicNote'
import LogoutIcon from '@mui/icons-material/ExitToApp'
import HousesBackDecor from 'components/view/HousesBackDecor'
import FlyingBirds from 'components/view/FlyingBirds'
import IconButton from 'components/base/IconButton'
import { ButtonVariant, pathWithAuth } from 'helpers/enums'
import AppSettingsModal from 'components/partial/AppSettingsModal'
import { setMusicVolume, setUserInfo } from 'store/actions'
import LoadingComponent from 'components/view/LoadingComponent'
import Notifications from 'components/partial/Notifications'
import mainTheme from 'assets/sounds/main_theme.ogg'

import styles from './Layout.module.scss'

const actx = new AudioContext()

const Layout: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const volume: number = useSelector((state: RootState) => state.musicVolume)
    const appLoading: number = useSelector((state: RootState) => state.appLoading)
    const initLoading: boolean = useSelector((state: RootState) => state.initLoading)
    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
    
    const [audioData, setAudioData] = useState<AudioBuffer | null>(null)
    const [srcNode, setSrcNode] = useState<AudioBufferSourceNode | null>(null)
    const [gainNode, setGainNode] = useState<GainNode| null>(null)

    const playLoop = useCallback((abuffer) => {
        const newSrcNode = actx.createBufferSource()
        newSrcNode.buffer = abuffer
        const newGainNode = actx.createGain()
        newSrcNode.connect(newGainNode)
        newGainNode.connect(actx.destination)
        newSrcNode.loop = true
        newSrcNode.start()
        setSrcNode(newSrcNode)
        setGainNode(newGainNode)
    }, [])

    const getAudioData = useCallback(async () => {
        const result = await fetch(mainTheme)
        const buffer = await result.arrayBuffer()
        actx.decodeAudioData(buffer, (abuffer) => {
            setAudioData(abuffer)
        })
    }, [])

    useEffect(() => {
        getAudioData()
    }, [])

    useEffect(() => {
        if (gainNode) {
            gainNode.gain.value = volume

            if (srcNode && volume === 0) {
                srcNode?.stop(0)
                setSrcNode(null)
                setGainNode(null)
            }
        }

        if (!srcNode && volume !== 0 && audioData) {
            playLoop(audioData)
        }
    }, [volume, gainNode, srcNode, audioData])
    
    useEffect(() => {
        const isNeedElAuth = pathWithAuth.includes(location.pathname)

        if (!initLoading && appLoading === 0 && isNeedElAuth && !userInfo) {
            navigate('/login')
        }
    }, [initLoading, appLoading, location, userInfo, navigate])

    const toggleMusic = useCallback(() => {
        if (volume) {
            srcNode?.stop(0)
            setSrcNode(null)
            setGainNode(null)
        } else {
            playLoop(audioData)
        }
        dispatch(setMusicVolume(volume !== 0 ? 0 : 0.5))
        
    }, [volume, dispatch, srcNode, audioData])

    const onLogout = useCallback(() => {
        localStorage.removeItem('auth')
        dispatch(setUserInfo(null))
        navigate('/login')
    }, [])

    return (
        <div className={styles.root}>
            {(appLoading !== 0 || initLoading) && (
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
                    {volume === 0 ? <MusicOff /> : <MusicNote />}
                </IconButton>
                {userInfo && (
                    <IconButton
                        variant={ButtonVariant.Secondary}
                        onClick={onLogout}
                    >
                        <LogoutIcon />
                    </IconButton>
                )}
            </div>
            <Notifications />
        </div>
    )
}

export default Layout