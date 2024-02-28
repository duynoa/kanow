'use client'

import { useEffect, useState } from "react";
import IntroSection from "./components/IntroSection";
import SectionCardCar from "./components/SectionCardCar";
import SectionBannerPromotion from "./components/SectionBannerPromotion";
import SectionTripCarServices from "./components/SectionTripCarServices";
import SectitonWhyWe from "./components/SectitonWhyWe";
import SectionShowApp from "./components/SectionShowApp";
import SectionArticle from "./components/SectionArticle";
import SectionPlaceProminent from "./components/SectionPlaceProminent";

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
            <SectionPlaceProminent />
            <SectionTripCarServices />
            <SectitonWhyWe />
            <SectionShowApp />
            <SectionArticle />
        </div>
    );
}
