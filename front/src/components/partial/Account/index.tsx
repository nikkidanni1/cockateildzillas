import React from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import { ButtonVariant } from 'helpers/enums'

import Box from 'components/base/Box'
import Button from 'components/base/Button'
import StandartAnimationCockatiel from 'components/view/StandartAnimationCockatiel'

import InfoBlock from './components/InfoBlock'
import styles from './Account.module.scss'

const Account: React.FC = () => {
    const navigate = useNavigate()

    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)

    const onClickFight = useCallback((): void => {
        navigate('/battlefield')
    }, [])

    return (
        <div className={styles.account_content}>
            {userInfo?.cockatiel && (
                <StandartAnimationCockatiel
                    className={styles.account_animationFrame}
                    colors={userInfo.cockatiel.appearanceData}
                />
            )}
            <div className={styles.account_stage} />
            <Box className={styles.account_box}>
                <InfoBlock userInfo={userInfo} />
                <Button
                    className={styles.account_button}
                    variant={ButtonVariant.Primary}
                    onClick={onClickFight}
                >
                    В бой!
                </Button>
            </Box>
        </div>
    )
}

export default Account