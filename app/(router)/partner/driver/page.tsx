'use client'

import React, { useEffect, useState } from 'react'
import DriverArticle from './components/DriverArticle'
import SignupDriverStep from './components/SignupDriverStep'
import WhyKanow from './components/WhyKanow'
import DriverBenefits from './components/DriverBenefits'
import DriverQuestions from './components/DriverQuestions'

type Props = {}

const Driver = (props: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <div className='bg-[#FBFBFC]'>
            <DriverArticle />
            <SignupDriverStep />
            <WhyKanow />
            <DriverBenefits />
            <DriverQuestions />
        </div>
    )
}

export default Driver