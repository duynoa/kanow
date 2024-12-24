'use client'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

const AnimatedCountUp = ({ end, className }: { end: number, className: string }) => {
    const [count, setCount] = useState(0);

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            const duration = 1500; // Thời gian đếm số (ms)
            const increment = end / (duration / 100);
            const timer = setInterval(() => {
                setCount((prev) => {
                    if (prev + increment >= end) {
                        clearInterval(timer);
                        return end;
                    }
                    return prev + increment;
                });
            }, 100);
            return () => clearInterval(timer);
        }
    }, [inView, end]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            className={`${className}`}
        >
            {Math.floor(count)}
        </motion.div>
    );
};

export default AnimatedCountUp