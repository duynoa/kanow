import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
    targetDate: string; // Thời gian tạo
    waitTimeInHours: number; // Thời gian chờ
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, waitTimeInHours }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const targetTime = new Date(targetDate);
        const endTime = new Date(targetTime.getTime() + waitTimeInHours * 60 * 60 * 1000);

        const interval = setInterval(() => {
            const now = new Date();
            const timeDiff = endTime.getTime() - now.getTime();

            if (timeDiff <= 0) {
                clearInterval(interval);
                setTimeLeft('Time is up!');
            } else {
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                // setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
                if (hours > 0) {
                    setTimeLeft(`${hours} giờ ${minutes} phút`);
                } else {
                    setTimeLeft(`${minutes} phút`);
                }
                // if (hours > 0) {
                //     setTimeLeft(`${hours} giờ ${minutes} phút ${seconds} giây`);
                // } else {
                //     setTimeLeft(`${minutes} phút ${seconds} giây`);
                // }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate, waitTimeInHours]);

    return <div>{timeLeft}</div>;
};

export default CountdownTimer;
