'use client'

import { useEffect, useState } from "react";
import IntroSection from "./components/IntroSection";
import SectionCardCar from "./components/SectionCardCar";
import SectionBannerPromotion from "./components/SectionBannerPromotion";
import SectionTripCarServices from "./components/SectionTripCarServices";
import SectitonWhyWe from "./components/SectitonWhyWe";

export default function Home() {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <div className='bg-[#FBFBFC]'>
            <IntroSection />
            <SectionCardCar />
            <SectionBannerPromotion />
            <SectionTripCarServices />
            <SectitonWhyWe />
        </div>
    );
}
