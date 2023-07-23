import React from 'react'
import { useEffect } from 'react'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Battlefield from 'components/partial/Battlefield'


const ButtlefieldPage: React.FC = () => {
    const navigate = useNavigate()

    const userInfo: UserInfo = useSelector((state: RootState) => state.userInfo)
    const appLoading: number = useSelector((state: RootState) => state.appLoading)
    const initLoading: boolean = useSelector((state: RootState) => state.initLoading)

    useEffect(() => {
        if (userInfo && (!userInfo?.cockatiel || !userInfo?.nickname)) {
            navigate('/account/edit')
        }
    }, [userInfo, navigate])

    if ((appLoading !== 0 || initLoading) || (appLoading === 0 && !initLoading && !userInfo)) {
        return <></>
    }

    return (
        <Battlefield />
    )
}

export default ButtlefieldPage