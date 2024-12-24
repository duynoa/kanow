'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { variantSlideUp } from '@/utils/variants-animation/Variants-Animation'

interface AnimateOnModalProps {
    children: React.ReactNode
    isVisible: boolean
    variants?: any
    className?: string
    index?: number
    style?: React.CSSProperties
}

// const initialVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
// }

const AnimateOnModal: React.FC<AnimateOnModalProps> = ({ children, className, variants = variantSlideUp, isVisible, index = 0, style }) => {
    return (
        <motion.div
            style={style}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default AnimateOnModal