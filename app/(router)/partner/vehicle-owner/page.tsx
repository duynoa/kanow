'use client'

import React, { useEffect, useState } from 'react'
import SectionBannerVehicleOwner from './components/SectionBannerVehicleOwner'
import SectionBenefitsVehicleOwner from './components/SectionBenefitsVehicleOwner'
import SectionSignUpVehicleOwner from './components/SectionSignUpVehicleOwner'

type Props = {}

const VehicleOwner = (props: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])



    if (!isMounted) {
        return null;
    }

    return (
        <>
            <SectionBannerVehicleOwner />
            <SectionBenefitsVehicleOwner />
            <SectionSignUpVehicleOwner />
        </>
    )
}

export default VehicleOwner