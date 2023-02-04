import React from 'react'
import { SVGAttributes } from 'react'

type Props = {
    isCustom: boolean,
    isActive: boolean
} & SVGAttributes<SVGElement>

const ColorPaletteItem: React.FC<Props> = ({ color, isActive, isCustom, ...props }) => (
    <svg  {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 13 13" shapeRendering="crispEdges">
        <path stroke={isActive ? "rgb(180,40,60)" : "#000000"} d="M5 0h3M3 1h2M8 1h2M2 2h1M10 2h1M1 3h1M11 3h1M1 4h1M11 4h1M0 5h1M12 5h1M0 6h1M12 6h1M0 7h1M12 7h1M1 8h1M11 8h1M1 9h1M11 9h1M2 10h1M10 10h1M3 11h2M8 11h2M5 12h3" />
        <path stroke={color} d="M5 1h3M3 2h7M2 3h9M2 4h9M1 5h11M1 6h11M1 7h11M2 8h9M2 9h9M3 10h7M5 11h3" />
        {isCustom && <path stroke={isActive ? "rgb(180,40,60)" : "#000000"} d="M5 3h3M4 4h2M8 4h1M3 5h2M3 6h2M3 7h2M4 8h2M8 8h1M5 9h3" />}
    </svg>
)

export default ColorPaletteItem