"use client"

import React, { useState } from 'react'
import Image from "next/image";

type Props = {
    image: string,
    width: number,
    height: number,
    alt: string,
    zoomIn?: boolean,
    className?: string
}

const BlurImage = ({ image, width, height, alt, zoomIn, className }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    return (
        <Image
            src={image}
            width={width}
            height={height}
            alt={alt}
            className={`w-full h-full object-cover
            ${className}
            ${zoomIn && "hover:scale-105 group-hover:scale-105"}
             transition-all duration-300 
             ${isLoading ? "scale-105 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0"}
             `}
            onLoadingComplete={() => setIsLoading(false)}
        />
    )
}

export default BlurImage