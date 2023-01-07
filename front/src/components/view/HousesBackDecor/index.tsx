import React from 'react'
import styles from './HousesBackDecor.module.scss'

const HousesBackDecor: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={`${styles.houses} ${styles.houses_front}`} />
      <div className={`${styles.houses} ${styles.housesLight_front}`} />
      <div className={`${styles.houses} ${styles.houses_back}`} />
      <div className={`${styles.houses} ${styles.housesLight_back}`} />
      <div className={`${styles.houses} ${styles.steam}`} />
    </div>
  )
}

export default HousesBackDecor