import React, { useEffect } from 'react'
import { useCallback, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Button from 'components/base/Button'
import DraggablePopover from 'components/view/DraggablePopover'
import ColorPaletteItem from 'assets/images/ColorPaletteItem'
import CustomColorPicker from './components/CustomColorPicker'

const useStyles = makeStyles({
    content: {
        padding: '0 12px'
    },
    colorPaletteItem: {
        width: 26,
        height: 26,
        cursor: 'pointer'
    },
    colorPaletteWrapper: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 26px)',
        rowGap: 8,
        columnGap: 8
    },
    button: {
        marginTop: 12
    }
})

const ColorEdit = ({ part, onClose, onChange, anchorPosition, appearanceData }) => {
    const classes = useStyles()
    const cockateilParts = useSelector(state => state.appContants?.cockateilParts)

    const [customColor, setCustomColor] = useState(appearanceData?.[part]?.main_color)
    const [isOpenCustomColorPicker, setOpenCustomColorPicker] = useState(false)
    console.log(appearanceData, 'appearanceData')

    useEffect(() => {
        if (part) {
            setCustomColor(appearanceData[part].main_color)
        }
    }, [part, appearanceData])

    const onChangeColor = useCallback((part, color, isCustom) => () => {
        if (isCustom) {
            setOpenCustomColorPicker(true)
        }
        onChange(part, color)
    }, [onChange])

    const colorsArray = useMemo(() => (
        cockateilParts?.[part]?.colorVariants ? [...cockateilParts?.[part]?.colorVariants, customColor] : []
    ), [customColor, cockateilParts, part])

    const handleButtonClick = useCallback((e) => {
        if (isOpenCustomColorPicker) {
            setOpenCustomColorPicker(false)
        } else {
            onClose(e)
        }
    }, [isOpenCustomColorPicker, onClose])

    return (
        <DraggablePopover
            isOpen={!!part}
            title={cockateilParts?.[part]?.name}
            onClose={onClose}
            anchorPosition={anchorPosition}
        >
            <div className={classes.content}>

                {!isOpenCustomColorPicker ? (
                    <div className={classes.colorPaletteWrapper}>
                        {colorsArray.map((color, index) => (
                            <ColorPaletteItem
                                isActive={appearanceData[part].main_color === color}
                                isCustom={index === colorsArray.length - 1}
                                onClick={onChangeColor(part, color, index === colorsArray.length - 1)}
                                className={classes.colorPaletteItem}
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
                    className={classes.button}
                    color="primary"
                    size="small"
                    onClick={handleButtonClick}
                >
                    ОК
                </Button>
            </div>
        </DraggablePopover>
    )
}

export default ColorEdit