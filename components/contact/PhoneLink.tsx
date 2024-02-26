import Link from 'next/link';
import React, { ReactNode } from 'react'

interface PhoneLinkProps {
    phoneNumber: string;
    text?: string | ReactNode;
    className?: string;
    children?: React.ReactNode
}

const PhoneLink: React.FC<PhoneLinkProps> = ({
    phoneNumber,
    text,
    className,
    children
}) => {
    return (
        <a href={`tel:+${phoneNumber}`} className={className} target="_blank">
            {text}
            {children}
        </a>
    );
};

export default PhoneLink;