import React from 'react'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import Box from 'components/base/Box'
import AccountEditForm from 'components/partial/AccountEditForm'
import styles from './AccountEditPage.module.scss'

const AccountEditPage: React.FC = () => {
    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
    const appLoading: number = useSelector((state: RootState) => state.appLoading)
    const initLoading: boolean = useSelector((state: RootState) => state.initLoading)

    if ((appLoading !== 0 || initLoading) || (appLoading === 0 && !initLoading && !userInfo)) {
        return <></>
    }

    return (
        <Box className={styles.box}>
            <div>
                <AccountEditForm />
            </div>
        </Box>
    )
}

export default AccountEditPage