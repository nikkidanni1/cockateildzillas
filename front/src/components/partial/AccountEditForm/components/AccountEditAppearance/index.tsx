import React from 'react'
import { useCallback, useState } from 'react'
import StandartAnimationCockatiel from 'components/view/StandartAnimationCockatiel'
import ColorEdit from './components/ColorEdit'
import styles from './AccountEditAppearance.module.scss'

type Props = {
    isShown: boolean,
    appearanceData: CockatielAppearanceData | null | undefined,
    onChangePartColor: (part: string, color: string) => void
}

const AccountEditAppearance: React.FC<Props> = ({ isShown, appearanceData, onChangePartColor }) => {
    const [selectedPart, setSelectedPart] = useState<string | null>(null)
    const [anchorPosition, setAnchorPosition] = useState<{ top: number, left: number } | null>(null)

    const handleClickAnimation: React.MouseEventHandler<SVGElement> = useCallback((e) => {
        const gNode: SVGGElement | null = (e.target as SVGPathElement).closest('g')
        if (gNode) {
            setSelectedPart(gNode.classList[0])
            setAnchorPosition({ top: e.clientY, left: e.clientX })
        }
    }, [])

    const onClose: React.MouseEventHandler = useCallback(() => {
        setSelectedPart(null)
    }, [])

    return (
        <div
            style={{ display: isShown ? 'block' : 'none' }}
        >
            {(isShown && appearanceData) && (
                <>
                    <div className={styles.backgroundAnimation}>
                        <StandartAnimationCockatiel
                            className={styles.animationFrame}
                            colors={appearanceData}
                            handleClick={handleClickAnimation}
                        />
                    </div>
                    <ColorEdit
                        key="colorEdit"
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