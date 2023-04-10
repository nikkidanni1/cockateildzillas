import React from 'react'
import HelpPopover from 'components/view/HelpPopover'
import styles from './HelpPopoverAppearanceTab.module.scss'

const HelpPopoverAppearanceTab = () => {
    return (
        <HelpPopover
            popoverProps={{
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                }
            }}
            paperClassName={styles.info__paper}
        >
            <p className={styles.info__p}>
                Для изменения цвета клинуть на соответствующую часть тела.
            </p>
            <p className={styles.info__p}>
                Доступно к изменению:
            </p>
            <ul className={styles.info__list}>
                <li>Голова</li>
                <li>Щёки</li>
                <li>Туловище</li>
            </ul>
            <p className={styles.info__p}>
                Можно использовать цвет из палитры предложенных, либо нажать на элемент палитры "c" и выбрать любой другой.
            </p>
        </HelpPopover>
    )
}

export default HelpPopoverAppearanceTab