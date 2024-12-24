import React from 'react'
import { motion } from 'framer-motion'

interface Props {
    children: React.ReactNode
    index?: number
    id?: string;
    inView: boolean
    style?: React.CSSProperties,
    className?: string
    initial?: any,
    animate?: any,
    transition?: any
}
const AnimatedTranslateY = ({ children, index, id, inView, style, className, initial, ...props }: Props) => {
    return (
        <motion.div
            {...props}
            id={index === 0 ? 'step' : `step-${id}`}
            key={index}
            initial={initial ? initial : { opacity: 0, y: -30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={{
                delay: index ? index * 1.2 : 0.2,
                duration: 0.5,
                ease: [0.42, 0, 0.58, 1]
            }}
            className={`${className}`}
            style={style}
        >
            {children}
        </motion.div>
    )
}

export default AnimatedTranslateY