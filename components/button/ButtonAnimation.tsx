import React from 'react'

import { motion } from 'framer-motion'

type Props = {
    title_button: string
    className?: string
    disabled?: boolean
}

const ButtonAnimation = ({ title_button, className, disabled = false }: Props) => {
    return (
        <motion.button
            initial={false}
            disabled={disabled}
            animate="rest"
            whileTap="press"
            variants={{
                rest: { scale: 1, transition: { duration: 0.2 } },
                press: { scale: 1.02, transition: { duration: 0.2 } },
            }}
            type='submit'
            className={className}
        // className="text-white capitalize rounded-none h-fit font-medium text-base border border-[#57A4FE] bg-[#57A4FE] hover:bg-[#57A4FE]/80 px-8 py-3"
        >
            {title_button}
        </motion.button>
    )
}

export default ButtonAnimation