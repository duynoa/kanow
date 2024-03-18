'use client'

import React, { useEffect, useState } from 'react'
import IntroSectionAbout from './components/IntroSectionAbout'
import SectionSecondAbout from './components/SectionSecondAbout'
import SectionThirdAbout from './components/SectionThirdAbout'

type Props = {}

const AboutUs = (props: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <IntroSectionAbout />
            <SectionSecondAbout />
            <SectionThirdAbout />
        </div>
    )
}

export default AboutUs