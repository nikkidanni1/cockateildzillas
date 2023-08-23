import React from 'react'
import { useEffect, useCallback, useState } from 'react'
import type { RootState, AppDispatch } from 'store'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { moveBattle, recreateBattle } from 'api'
import { ButtonVariant } from 'helpers/enums'
import { addSubColorsToAppearanceData } from 'helpers/utils'
import { addNotification, setActiveBattle } from 'store/actions'
import { getBattleThunk } from 'store/thunk'
import StandartAnimationCockatiel from 'components/view/StandartAnimationCockatiel'
import Button from 'components/base/Button'
import Box from 'components/base/Box'
import Slider from 'components/base/Slider'
import IconHoverPopover from 'components/view/IconHoverPopover'
import PowerIcon from 'assets/images/PowerIcon'
import DodgeIcon from 'assets/images/DodgeIcon'
import HPBar from './components/HPBar'
import styles from './Battlefield.module.scss'

interface IProps {
    isVisible: boolean,
}

const Battlefield: React.FC<IProps> = ({ isVisible }) => {
    const dispatch: AppDispatch = useDispatch()

    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
    const appConstants: AppConstants | null = useSelector((state: RootState) => state.appConstants)
    const activeBattle: Battle = useSelector((state: RootState) => state.activeBattle)

    const [isBattleFeched, setBattleFetched] = useState<boolean>(false)
    const [adversaryAppearanceData, setAdversaryAppearanceData] = useState<CockatielAppearanceData | null>(null)
    const [hit, setHit] = useState<number>(50)
    const [isLoading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!isBattleFeched) {
            setBattleFetched(true)
            dispatch(getBattleThunk())
        }
    }, [activeBattle, isBattleFeched])

    useEffect(() => {
        if (appConstants) {
            setAdversaryAppearanceData(
                addSubColorsToAppearanceData(
                    appConstants.cockatielAppearanceDataDefault, 
                    appConstants
                )
            )
        }
    }, [appConstants])

    const onChangeHit = useCallback((e: Event, value: number | number[]) => {
        if (typeof value === 'number') {
            setHit(value)
        }
    }, [])

    const onMoveSubmit = useCallback(async () => {
        try {
            setLoading(true)
            const newBattle = await moveBattle(hit)

            if (newBattle.error) {
                dispatch(addNotification({
                    id: _.uniqueId(),
                    text: newBattle.error,
                    mode: 'error'
                }))
                return
            }

            dispatch(setActiveBattle(newBattle.responseBody))
        } catch (err) {
            if (err instanceof Error) {
                dispatch(addNotification({
                    id: _.uniqueId(),
                    text: err.message,
                    mode: 'error'
                }))
            }
        } finally {
            setLoading(false)
        }
    }, [hit, dispatch])

    const onAnew = useCallback(async () => {
        try {
            setLoading(true)
            const newBattle = await recreateBattle()

            if (newBattle.error) {
                dispatch(addNotification({
                    id: _.uniqueId(),
                    text: newBattle.error,
                    mode: 'error'
                }))
                return
            }

            dispatch(setActiveBattle(newBattle.responseBody))
        } catch (err) {
            if (err instanceof Error) {
                dispatch(addNotification({
                    id: _.uniqueId(),
                    text: err.message,
                    mode: 'error'
                }))
            }
        } finally {
            setLoading(false)
        }
    }, [])

    return (
        <div className={styles.battlefield}>
            {isVisible && 
                <>
                    <HPBar maxhealth={appConstants?.maxHealth || 0} health={activeBattle?.health || 0} isAdversary={false} />
                    {userInfo?.cockatiel?.appearanceData && (
                        <StandartAnimationCockatiel
                            className={styles.animationFrame__user}
                            colors={userInfo.cockatiel.appearanceData}
                        />
                    )}
                    <HPBar maxhealth={appConstants?.maxHealth || 0} health={activeBattle?.healthAdversary || 0} isAdversary />
                    {adversaryAppearanceData && (
                        <StandartAnimationCockatiel
                            className={styles.animationFrame__adversary}
                            colors={adversaryAppearanceData}
                        />
                    )}
                    <Box className={styles.box}>
                        <div className={styles.slider__wrapper}>
                            <IconHoverPopover 
                                Icon={DodgeIcon}
                                popoverProps={{
                                    anchorOrigin: {
                                        vertical: 'top',
                                        horizontal: 'left',
                                    },
                                    transformOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }
                                }}
                                iconProps={{ width: '40px', fill: '#ffffff' }}
                                paperClassName={styles.popoverPaper}
                            >
                                Шанс уклониться
                            </IconHoverPopover>
                            <Slider value={hit} onChange={onChangeHit} disabled={activeBattle?.health === 0 || activeBattle?.healthAdversary === 0} />
                            <IconHoverPopover 
                                Icon={PowerIcon}
                                popoverProps={{
                                    anchorOrigin: {
                                        vertical: 'top',
                                        horizontal: 'left',
                                    },
                                    transformOrigin: {
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }
                                }}
                                iconProps={{ width: '40px', fill: '#ffffff', className: styles.powerIcon }}
                                paperClassName={styles.popoverPaper}
                            >
                                Усиление атаки
                            </IconHoverPopover>
                        </div>
                        <Button
                            className={styles.button}
                            variant={ButtonVariant.Primary}
                            onClick={(activeBattle?.health === 0 || activeBattle?.healthAdversary === 0 ) ? onAnew : onMoveSubmit}
                            size="small"
                            disabled={isLoading || !isVisible}
                            endIcon={(isLoading || !isVisible) && <CircularProgress size="0.875rem" />}
                        >
                            {(activeBattle?.health === 0 || activeBattle?.healthAdversary === 0) ? 'Заново' : 'Атака'}
                        </Button>
                        <Link
                            className={styles.hideUnderLine}
                            to="/account"
                        >
                            <Button
                                className={styles.button}
                                variant={ButtonVariant.Secondary}
                                size="small"
                            >
                                В профиль
                            </Button>
                        </Link>
                    </Box>
                </>
            }
        </div>
    )
}

export default Battlefield