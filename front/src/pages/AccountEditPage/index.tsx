import React from 'react'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import Box from 'components/base/Box'
import AccountEditForm from 'components/partial/AccountEditForm'
import styles from './AccountEditPage.module.scss'

const AccountEditPage: React.FC = () => {
    const appLoading: number = useSelector((state: RootState) => state.appLoading)
    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)

    return (
        <>
            {
                (appLoading === 0 || userInfo) && (
                    <Box className={styles.box}>
                        <div>
                            <AccountEditForm />
                        </div>
                    </Box>
                )
            }
        </>

    )
}

export default AccountEditPage