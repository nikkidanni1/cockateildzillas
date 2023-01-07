import React, { useEffect } from 'react'
import { useCallback, useState, useMemo } from 'react'
import type { RootState } from 'store'
import { useSelector } from 'react-redux'
import Button from 'components/base/Button'
import { ButtonVariant } from 'helpers/enums'
import DraggablePopover from 'components/view/DraggablePopover'
import ColorPaletteItem from 'assets/images/ColorPaletteItem'
import CustomColorPicker from './components/CustomColorPicker'
import styles from './ColorEdit.module.scss'
import { PopoverPosition } from '@mui/material/Popover/Popover'

type Props = {
    part: string | null,
    onClose: React.MouseEventHandler,
    onChange: (part: string, color: string) => void,
    anchorPosition: PopoverPosition | null,
    appearanceData: CockateilAppearanceData | null,
}

const ColorEdit: React.FC<Props> = ({ part, onClose, onChange, anchorPosition, appearanceData }) => {
    const cockateilPartInfo: CockateilPartInfo | undefined = useSelector((state: RootState) => state.appConstants?.cockateilPartInfo)

    const [customColor, setCustomColor] = useState<string>((part && appearanceData) ? appearanceData[part]?.main_color : '')
    const [isOpenCustomColorPicker, setOpenCustomColorPicker] = useState<boolean>(false)

    useEffect(() => {
        if (part && appearanceData) {
            setCustomColor(appearanceData[part].main_color)
        }
    }, [part, appearanceData])

    const onChangeColor = useCallback((part: string, color: string, isCustom: boolean) => () => {
        if (isCustom) {
            setOpenCustomColorPicker(true)
        }
        onChange(part, color)
    }, [onChange])

    const colorsArray: Array<string> = useMemo(() => (
        (part && cockateilPartInfo?.[part]?.colorVariants) ? [...cockateilPartInfo?.[part]?.colorVariants, customColor] : []
    ), [customColor, cockateilPartInfo, part])

    const handleButtonClick: React.MouseEventHandler = useCallback((e) => {
        if (isOpenCustomColorPicker) {
            setOpenCustomColorPicker(false)
        } else {
            onClose(e)
        }
    }, [isOpenCustomColorPicker, onClose])

    return (
        <>
            {(part && appearanceData) && (
                <DraggablePopover
                    open={!!part}
                    title={cockateilPartInfo?.[part]?.name}
                    onClose={onClose}
                    anchorPosition={anchorPosition}
                >
                    <div className={styles.content}>
                        {!isOpenCustomColorPicker ? (
                            <div className={styles.colorPaletteWrapper}>
                                {colorsArray.map((color, index) => (
                                    <ColorPaletteItem
                                        isActive={appearanceData[part].main_color === color}
                                        isCustom={index === colorsArray.length - 1}
                                        onClick={onChangeColor(part, color, index === colorsArray.length - 1)}
                                        className={styles.colorPaletteItem}
                                        color={color}
                                    />
                                ))}
                            </div>
                        ) : (
                            <CustomColorPicker
                                customColor={customColor}
                                setCustomColor={setCustomColor}
                                onChangeAppearanceData={onChange.bind(null, part)}
                            />
                        )}
                        <Button
                            className={styles.button}
                            variant={ButtonVariant.Primary}
                            size="small"
                            onClick={handleButtonClick}
                        >
                            ОК
                        </Button>
                    </div>
                </DraggablePopover>
            )}
        </>

    )
}

export default ColorEdit