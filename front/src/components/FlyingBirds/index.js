import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        overflow: 'hidden',
        width: '100vw',
        height: '100vh',
    },
    flyingBird: {
        width: 106,
        height: 115,
        animation: '$flyingBird infinite',
        animationDuration: '1.25s',
        animationFillMode: 'forwards',
      },
      moveAnimationBird: {
        position: 'absolute',
        right: -100,
        zIndex: 6,
        animation: '$moveAnimationBird infinite',
        animationDuration: '35s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'linear',
      },
      moveAnimationBird1: {
        animationDelay: '1.5s',
        transform: 'scale(0.5)',
        '& div': {
          animationDelay: '0.5s'
        }
      },
      moveAnimationBird2: {
        top: '20%',
        animationDelay: '1.25s',
        transform: 'scale(0.6)',
        zIndex: 7,
        '& div': {
          animationDelay: '1.5s'
        }
      },
      moveAnimationBird3: {
        top: '10%',
        transform: 'scale(0.65)',
      },
      moveAnimationBird4: {
        top: '20%',
        animationDelay: '2.5s',
        transform: 'scale(0.5)',
        '& div': {
          animationDelay: '2.5s'
        }
      },
      moveAnimationBird5: {
        top: '13%',
        animationDelay: '5.5s',
        transform: 'scale(0.5)',
        '& div': {
          animationDelay: '3.5s',
          animationDuration: '0.75s',
        }
      },
      moveAnimationBird6: {
        top: '10%',
        animationDelay: '1.8s',
        transform: 'scale(0.5)',
        '& div': {
          animationDelay: '1.8s'
        }
      },
      moveAnimationBird7: {
        top: '12%',
        animationDelay: '3.25s',
        transform: 'scale(0.5)',
        '& div': {
          animationDelay: '2s'
        }
      },
      moveAnimationBird8: {
        animationDelay: '3.2s',
        transform: 'scale(0.5)',
        '& div': {
          animationDelay: '3.2s'
        }
      },
      moveAnimationBird9: {
        top: '2%',
        animationDelay: '4.5s',
        transform: 'scale(0.5)',
        '& div': {
          animationDelay: '4.2s'
        }
      },
      moveAnimationBird10: {
        top: '25%',
        animationDelay: '4.2s',
        transform: 'scale(0.6)',
        '& div': {
          animationDelay: '3.2s'
        }
      },
      '@keyframes moveAnimationBird': {
        '0%': {
          right: -100
        },
        '40%': {
          right: '100%'
        },
        '100%': {
          right: '100%'
        },
      },
      '@keyframes flyingBird': {
        '0%': {
          backgroundImage: 'url("/bird-fly-1.png")'
        },
        '11.1%': {
          backgroundImage: 'url("/bird-fly-2.png")'
        },
        '22.2%': {
          backgroundImage: 'url("/bird-fly-3.png")'
        },
        '33.3%': {
          backgroundImage: 'url("/bird-fly-4.png")'
        },
        '44.4%': {
          backgroundImage: 'url("/bird-fly-5.png")'
        },
        '55.5%': {
          backgroundImage: 'url("/bird-fly-6.png")'
        },
        '66.6%': {
          backgroundImage: 'url("/bird-fly-5.png")'
        },
        '77.7%': {
          backgroundImage: 'url("/bird-fly-4.png")'
        },
        '89%': {
          backgroundImage: 'url("/bird-fly-3.png")'
        },
        '100%': {
          backgroundImage: 'url("/bird-fly-2.png")'
        },
      },
})

const FlyingBirds = () => {
    const classes = useStyles()
    return (
      <div className={classes.root}>
        <div className={`${classes.moveAnimationBird} ${classes.moveAnimationBird1}`}>
          <div className={`${classes.flyingBird} `} />
        </div>
        <div className={`${classes.moveAnimationBird} ${classes.moveAnimationBird2}`}>
          <div className={`${classes.flyingBird} `} />
        </div>
        <div className={`${classes.moveAnimationBird} ${classes.moveAnimationBird3}`}>
          <div className={`${classes.flyingBird} `} />
        </div>
        <div className={`${classes.moveAnimationBird} ${classes.moveAnimationBird4}`}>
          <div className={`${classes.flyingBird} `} />
        </div>
        <div className={`${classes.moveAnimationBird} ${classes.moveAnimationBird5}`}>
          <div className={`${classes.flyingBird} `} />
        </div>
        <div className={`${classes.moveAnimationBird} ${classes.moveAnimationBird6}`}>
          <div className={`${classes.flyingBird} `} />
        </div>
        <div className={`${classes.moveAnimationBird} ${classes.moveAnimationBird7}`}>
          <div className={`${classes.flyingBird} `} />
        </div>
        <div className={`${classes.moveAnimationBird} ${classes.moveAnimationBird8}`}>
          <div className={`${classes.flyingBird} `} />
        </div>
        <div className={`${classes.moveAnimationBird} ${classes.moveAnimationBird9}`}>
          <div className={`${classes.flyingBird} `} />
        </div>
        <div className={`${classes.moveAnimationBird} ${classes.moveAnimationBird10}`}>
          <div className={`${classes.flyingBird} `} />
        </div>
      </div>
    )
  }
  
  export default FlyingBirds