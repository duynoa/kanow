'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { variantSlideUp } from '@/utils/variants-animation/Variants-Animation'

interface AnimateOnScrollProps {
    children: React.ReactNode
    variants?: any
    className?: string
    index?: number
    style?: React.CSSProperties
}

// const initialVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0 },
// }

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({ children, className, variants = variantSlideUp, index = 0, style }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })


    return (
        <motion.div
            style={style}
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default AnimateOnScroll