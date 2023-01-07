import React from 'react'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import Box from 'components/base/Box'
import AccountEditForm from 'components/partial/AccountEditForm'
import styles from './AccountEdit.module.scss'

const AccountEdit: React.FC = () => {
    const appLoading = useSelector((state: RootState) => state.appLoading)

    return (
        <>
            {
                !appLoading && (
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

export default AccountEdit