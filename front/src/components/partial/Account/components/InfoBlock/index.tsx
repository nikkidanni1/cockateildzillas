import React from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { AppDispatch } from 'store'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import { addNotification } from 'store/actions'
import CopyIcon from '@mui/icons-material/FilterNone'
import Button from 'components/base/Button'
import IconButton from 'components/base/IconButton'
import { ButtonVariant } from 'helpers/enums'
import styles from './InfoBlock.module.scss'

interface IProps {
    userInfo: UserInfo
}

const InfoBlock: React.FC<IProps> = ({ userInfo }) => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()

    const onCopyID: React.MouseEventHandler = useCallback(() => {
        if (navigator) {
            navigator.clipboard.writeText(userInfo?._id ?? '')
            dispatch(addNotification({
                id: _.uniqueId(),
                text: 'СКОПИРОВАНО',
                mode: 'info'
            }))
        }
    }, [userInfo, dispatch])

    const onClickEdit = useCallback((): void => {
        navigate('/account/edit')
    }, [])

    const onClickUsers = useCallback((): void => {
        navigate('/users')
    }, [])

    return (
        <div className={styles.infoBlock}>
            <p>
                ID:
                <b>&#8194;{userInfo?._id}</b>
                <IconButton
                    className={styles.infoBlock_copyIcon}
                    onClick={onCopyID}
                    variant={ButtonVariant.Secondary}
                    edge="end"
                >
                    <CopyIcon />
                </IconButton>
            </p>
            <p>
                Кличка воина:
                <b>&#8194;{userInfo?.cockatiel?.name}</b>
            </p>
            <Button
                className={styles.infoBlock_button}
                variant={ButtonVariant.Secondary}
                onClick={onClickEdit}
            >
                Редактировать ...
            </Button>
            <p>
                Боев:
                <b>&#8194;{userInfo?.battleCounter}</b>
            </p>
            <p>
                Побед:
                <b>&#8194;{userInfo?.winCounter}</b>
            </p>
            <Button
                className={styles.infoBlock_button}
                variant={ButtonVariant.Secondary}
                onClick={onClickUsers}
            >
                Рейтинг
            </Button>
        </div>
    )
}

export default InfoBlock