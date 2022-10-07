import React from 'react'
import { useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import StandartAnimationCockateil from 'components/view/StandartAnimationCockateil'
import ColorEdit from './components/ColorEdit'

const useStyles = makeStyles({
    animationFrame: {
        background: 'linear-gradient(180deg, rgb(45,50,70) 10%, rgb(80,50,70) 88%, rgb(45,50,70)) 2%',
        margin: "0 -24px",
        "& g:hover": {
            cursor: "pointer",
            filter: "sepia(50%)"
        }
    }
})

const AccountEditAppearance = ({ isShown, appearanceData, onChangePartColor }) => {
    const classes = useStyles()

    const [selectedPart, setSelectedPart] = useState(null)
    const [anchorPosition, setAnchorPosition] = React.useState(null)

    const handleClickAnimation = useCallback((e) => {
        const parentNode = e.target.parentNode
        if (parentNode.tagName === "g") {
            setSelectedPart(parentNode.classList[0])
            setAnchorPosition({ top: e.clientY, left: e.clientX })
        }
    }, [])

    const onClose = useCallback(() => {
        setSelectedPart(null)
    }, [])

    return (
        <div 
            style={{ display: isShown ? 'block' : 'none' }}
        >
            {isShown && (
                <>
                    <StandartAnimationCockateil
                        className={classes.animationFrame}
                        colors={appearanceData}
                        handleClick={handleClickAnimation}
                    />
                    <ColorEdit
                        part={selectedPart}
                        appearanceData={appearanceData}
                        anchorPosition={anchorPosition}
                        onChange={onChangePartColor}
                        onClose={onClose}
                    />
                </>
            )}
        </div>
    )
}

export default AccountEditAppearance