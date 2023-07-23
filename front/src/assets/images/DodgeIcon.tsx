import React from 'react'
import { SVGAttributes } from 'react'

type Props = {

} & SVGAttributes<SVGElement>

const DodgeIcon: React.FC<Props> = ({ fill, ...props }) => (
    <svg {...props} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <g id="wind" transform="translate(-2 -2)">
            <path id="primary" d="M3,7h7a2,2,0,0,0,0-4" fill="none" stroke={fill} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            <path id="primary-2" data-name="primary" d="M16,21a3,3,0,0,0,0-6H3" fill="none" stroke={fill} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            <line id="primary-3" data-name="primary" x2="7" transform="translate(3 19)" fill="none" stroke={fill} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            <path id="primary-4" data-name="primary" d="M3,11H17.5a3.5,3.5,0,1,0,0-7" fill="none" stroke={fill} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </g>
    </svg>
)

export default DodgeIcon