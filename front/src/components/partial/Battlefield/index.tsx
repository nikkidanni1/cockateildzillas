import React from 'react'
import { useEffect, useCallback, useState } from 'react'
import type { RootState, AppDispatch } from 'store'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { getBattle, moveBattle, recreateBattle } from 'api'
import { ButtonVariant } from 'helpers/enums'
import { addSubColorsToAppearanceData } from 'helpers/utils'
import { addNotification } from 'store/actions'
import StandartAnimationCockatiel from 'components/view/StandartAnimationCockatiel'
import Button from 'components/base/Button'
import Box from 'components/base/Box'
import Slider from 'components/base/Slider'
import IconHoverPopover from 'components/view/IconHoverPopover'
import PowerIcon from 'assets/images/PowerIcon'
import DodgeIcon from 'assets/images/DodgeIcon'
import HPBar from './components/HPBar'
import styles from './Battlefield.module.scss'

const Battlefield: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
    const appConstants: AppConstants | null = useSelector((state: RootState) => state.appConstants)

    const [adversaryAppearanceData, setAdversaryAppearanceData] = useState<CockatielAppearanceData | null>(null)
    const [battleState, setBattleState] = useState<Battle | null>(null)
    const [hit, setHit] = useState<number>(50)

    useEffect(() => {
        onGetBattle()
    }, [])

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

    const onGetBattle = useCallback(async () => {
        const battle: ServerResponse<Battle> = await getBattle()

        if (battle.error) {
            dispatch(addNotification({
                id: _.uniqueId(),
                text: battle.error,
                mode: 'error'
            }))
            return
        }
        
        setBattleState(battle.responseBody)
    }, [])

    const onChangeHit = useCallback((e: Event, value: number | number[]) => {
        if (typeof value === 'number') {
            setHit(value)
        }
    }, [])

    const onMoveSubmit = useCallback(async () => {
        const newBattle = await moveBattle(hit)

        if (newBattle.error) {
            dispatch(addNotification({
                id: _.uniqueId(),
                text: newBattle.error,
                mode: 'error'
            }))
            return
        }

        setBattleState(newBattle.responseBody)
    }, [hit, dispatch])

    const onAnew = useCallback(async () => {
        const newBattle = await recreateBattle()

        if (newBattle.error) {
            dispatch(addNotification({
                id: _.uniqueId(),
                text: newBattle.error,
                mode: 'error'
            }))
            return
        }

        setBattleState(newBattle.responseBody)
    }, [])

    return (
        <div className={styles.battlefield}>
            <HPBar maxhealth={100} health={100} />
            {userInfo?.cockatiel?.appearanceData && (
                <StandartAnimationCockatiel
                    className={styles.animationFrame__user}
                    colors={userInfo.cockatiel.appearanceData}
                />
            )}
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
                        Уклонение
                    </IconHoverPopover>
                    <Slider value={hit} onChange={onChangeHit} disabled={battleState?.health === 0 || battleState?.healthAdversary === 0} />
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
                        Сила атаки
                    </IconHoverPopover>
                </div>
                <p>Здоровье игрока: {battleState?.health}</p>
                <p>Здоровье соперника: {battleState?.healthAdversary}</p>
                <Button
                    className={styles.button}
                    variant={ButtonVariant.Primary}
                    onClick={(battleState?.health === 0 || battleState?.healthAdversary === 0 ) ? onAnew : onMoveSubmit}
                    size="small"
                >
                    {(battleState?.health === 0 || battleState?.healthAdversary === 0) ? 'Заново' : 'Атака'}
                </Button>
                <Link
                    className={styles.hideUnderLine}
                    to="/login"
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
        </div>
    )
}

export default Battlefield