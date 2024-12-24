const variantSlideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
}

const variantSlideRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
}

const variantSlideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
}

const variantSlideDown = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
}

const variantSlideZoomOut = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        // transition: {
        //     duration: 0.5, // Tăng thời gian của transition
        //     delayChildren: 0.3, // Độ trễ trước khi con bắt đầu animation
        //     staggerChildren: 0.2, // Thời gian giữa các hoạt ảnh của con
        // },
    }
}

export {
    variantSlideLeft,
    variantSlideRight,
    variantSlideUp,
    variantSlideDown,
    variantSlideZoomOut
}