import React from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import { ButtonVariant } from 'helpers/enums'

import Button from 'components/base/Button'
import StandartAnimationCockatiel from 'components/view/StandartAnimationCockatiel'

import styles from './Account.module.scss'

const Account: React.FC = () => {
    const navigate = useNavigate()

    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)

    const onClickEdit = useCallback((e: React.SyntheticEvent): void => {
        navigate('/account/edit')
    }, [])

    const onClickFight = useCallback((e: React.SyntheticEvent): void => {
        navigate('/battlefield')
    }, [])

    return (
        <div className={styles.content}>
            <div>
                {userInfo?.cockatiel && (
                    <StandartAnimationCockatiel
                        className={styles.animationFrame}
                        colors={userInfo.cockatiel.appearanceData}
                    />)
                }
            </div>
            <div className={styles.actions}>
                <Button
                    variant={ButtonVariant.Primary}
                    onClick={onClickFight}
                >
                    В бой!
                </Button>
                <Button
                    variant={ButtonVariant.Secondary}
                    onClick={onClickEdit}
                >
                    Редактировать
                </Button>
                <Button
                    variant={ButtonVariant.Secondary}
                    disabled
                >
                    Список игроков
                </Button>
            </div>
        </div>
    )
}

export default Account