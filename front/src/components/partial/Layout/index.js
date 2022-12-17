import React, { useCallback } from 'react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MusicOff from '@material-ui/icons/MusicOff'
import MusicNote from '@material-ui/icons/MusicNote'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import HousesBackDecor from 'components/view/HousesBackDecor'
import FlyingBirds from 'components/view/FlyingBirds'
import IconButton from 'components/base/IconButton'
import AppSettingsModal from 'components/partial/AppSettingsModal'
import { setMusicVolume } from 'store/actions'

const useStyles = makeStyles(theme => ({
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
        top: '80px',
        left: '50%',
        display: 'table',
        fontFamily: 'MultiTypePixel',
        fontSize: '3.75rem',
        lineHeight: '1.1',
        color: 'rgb(255,255,255)',
        transform: 'translate(-50%)',
        '& span': {
            color: '#0B2349',
            textAlign: 'center',
            background: 'linear-gradient(0deg, rgb(80,40,60) 5%, #fff 95%)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
        },
        [theme.breakpoints.down('xs')]: {
            top: '20px',
            letterSpacing: '-0.2rem',
            '& span': {
                display: 'block',
                fontSize: '3.5rem'
            }
        }
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
}))

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
            <Typography className={classes.title}>
                <span>COCKATEIL</span>
                <span>DZILLAS</span>
            </Typography>
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