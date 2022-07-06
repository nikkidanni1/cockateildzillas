import React from 'react'
import { useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import StandartAnimationCockateil from '../../../../components/StandartAnimationCockateil'

const useStyles = makeStyles({
    animationFrame: {
        background: '#0d0c1a',
        "& g:hover": {
            cursor: "pointer",
            filter: "brightness(200%) contrast(195%)"
        }
    }
})

const AccountEditAppearance = ({ isShown }) => {
    const classes = useStyles()

    const [selectedPart, setSelectedPart] = useState(null)

    const handleClickAnimation = useCallback((e) => {
        const parentNode = e.target.parentNode
        if (parentNode.tagName === "g") {
            setSelectedPart(parentNode.classList[0])
        }
    }, [])

    return (
        <div style={{ display: isShown ? 'block' : 'none' }}>
            {isShown && (
                <StandartAnimationCockateil
                    className={classes.animationFrame}
                    handleClick={handleClickAnimation}
                />
            )}
        </div>
    )
}

export default AccountEditAppearance