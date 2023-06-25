import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import Box from 'components/base/Box'
import Account from 'components/partial/Account'
import styles from './AccountPage.module.scss'

const AccountPage: React.FC = () => {
    const navigate = useNavigate()

    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
    const appLoading: number = useSelector((state: RootState) => state.appLoading)

    useEffect(() => {
        if (userInfo && (!userInfo?.cockatiel || !userInfo?.nickname)) {
            navigate('/account/edit')
        }
    }, [userInfo])

    return (
        <>
            {
                appLoading === 0 && (
                    <Box className={styles.box}>
                        <Account />
                    </Box>
                )
            }
        </>

    )
}

export default AccountPage