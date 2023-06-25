import React from 'react'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import { ButtonVariant } from 'helpers/enums'

import Tabs from 'components/base/Tabs'
import Button from 'components/base/Button'
import StandartAnimationCockatiel from 'components/view/StandartAnimationCockatiel'

import styles from './Account.module.scss'

enum TabValue {
    Cockatiel = "COCKATIEL",
    User = 'USER'
}

const tabs: Array<TabItem<TabValue>> = [
    {
        value: TabValue.Cockatiel,
        label: "Воин"
    },
    {
        value: TabValue.User,
        label: "Пользователь"
    }
]

const Account: React.FC = () => {
    const navigate = useNavigate()

    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)

    const [activeTab, setActiveTab] = useState<TabValue>(tabs[0].value)

    const onChangeTab = useCallback((e: React.SyntheticEvent, value: TabValue): void => {
        setActiveTab(value)
    }, [])

    const onClickEdit = useCallback((e: React.SyntheticEvent): void => {
        navigate('/account/edit')
    }, [])

    return (
        <div className={styles.content}>
            <Tabs
                className={styles.tabs}
                value={activeTab}
                onChange={onChangeTab}
                tabs={tabs}
            />
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
                >
                    Список игроков
                </Button>
            </div>

        </div>
    )
}

export default Account