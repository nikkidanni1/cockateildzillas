import React from 'react'
import styles from './FlyingBirds.module.scss'

const FlyingBirds: React.FC = () => {
  return (
    <div className={styles.root}>
      {new Array(10).fill(null).map((_, index) => (
        <div className={`${styles.bird} ${styles[`bird_${index + 1}`]}`} key={index}>
          <div className={`${styles.bird__frames} `} />
        </div>
      ))}
    </div>
  )
}

export default FlyingBirds