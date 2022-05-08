import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    overflow: 'hidden',
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(180deg, rgb(45,50,70) 20%, rgb(80,50,70) 80%)',
  },
  houses: {
    position: 'absolute',
    backgroundRepeat: 'repeat-x',
    backgroundPosition: 'right bottom',
    width: '100vw',
    height: '100vh',
  },
  housesFront: {
    zIndex: 5,
    backgroundImage: 'url("/houses_front.png")'
  },
  housesBack: {
    zIndex: 2,
    backgroundImage: 'url("/houses_back.png")'
  },
  steam: {
    backgroundImage: 'url("/steam.png")',
    zIndex: 4
  },
  frontLight: {
    zIndex: 3,
    animation: '$flickerFront infinite',
    animationDuration: '7s',
    animationFillMode: 'forwards'
  },
  backLight: {
    zIndex: 1,
    animation: '$flickerBack infinite',
    animationDuration: '5s',
    animationFillMode: 'forwards'
  },
  '@keyframes flickerFront': {
    '0%': {
      backgroundImage: 'url("/front_light.png")'
    },
    '50%': {
      backgroundImage: 'url("/front_red.png")'
    },
    '100%': {
      backgroundImage: 'url("/front_light.png")'
    }
  },
  '@keyframes flickerBack': {
    '0%': {
      backgroundImage: 'url("/back_light.png")'
    },
    '50%': {
      backgroundImage: 'url("/back_red.png")'
    },
    '100%': {
      backgroundImage: 'url("/back_light.png")'
    }
  }
})

const HousesBackDecor = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={`${classes.houses} ${classes.housesFront}`} />
      <div className={`${classes.houses} ${classes.frontLight}`} />
      <div className={`${classes.houses} ${classes.housesBack}`} />
      <div className={`${classes.houses} ${classes.backLight}`} />
      <div className={`${classes.houses} ${classes.steam}`} />
    </div>
  )
}

export default HousesBackDecor