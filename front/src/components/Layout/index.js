import React, { useCallback } from 'react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MusicOff from '@material-ui/icons/MusicOff'
import MusicNote from '@material-ui/icons/MusicNote'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import HousesBackDecor from '../HousesBackDecor'
import FlyingBirds from '../FlyingBirds'
import IconButton from '../IconButton'
import AppSettingsModal from '../AppSettingsModal'
import { setMusicVolume } from '../../store/actions'

const useStyles = makeStyles({
    root: {
        position: 'relative',
        zIndex: 6,
        overflow: 'hidden'
    },
    rootChildren: {
        position: 'relative',
        zIndex: 7,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
    },
    title: {
        position: 'absolute',
        top: '12%',
        left: '50%',
        fontFamily: 'MultiTypePixel',
        fontSize: '3.75rem',
        color: 'rgb(255,255,255)',
        transform: 'translate(-50%)',
        background: 'linear-gradient(0deg, rgb(80,40,60) 30%, #fff 70%)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        color: '#0B2349',
        display: 'table'
    },
    settings: {
        zIndex: 8,
        position: 'absolute',
        bottom: 0,
        marginBottom: 5,
        '& svg': {
            fontSize: '1.75rem',
            color: 'rgba(255,255,255,0.53)'
        },
        '& button:hover svg': {
            color: 'rgba(255,255,255,0.83)'
        }
    }
})

const audioUrl = '/cockateildzillas-main.mp3'

const Layout = ({ children }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const volume = useSelector(state => state.musicVolume)
    const appLoading = useSelector(state => state.appLoading)
    const userInfo = useSelector(state => state.userInfo)

    const [audio, setAudio] = useState(null)

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
        <div className={classes.root}>
            <HousesBackDecor />
            <FlyingBirds />
            <Typography className={classes.title}>COCKATEILDZILLAS</Typography>
            <div className={classes.rootChildren}>
                {children}
            </div>
            <div className={classes.settings}>
                <AppSettingsModal />
                <IconButton
                    isActive={volume !== 0}
                    onClick={toggleMusic}
                >
                    {volume === 0 ? <MusicOff /> : <MusicNote />}
                </IconButton>
                {(!appLoading && userInfo) && (
                    <IconButton
                        isActive={volume !== 0}
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