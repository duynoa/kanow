import React from 'react';

interface EmailLinkProps {
    email: string;
    children?: React.ReactNode
    className?: string;
}

const EmailLink = ({ email, children, className }: EmailLinkProps) => {
    return (
        <a href={`mailto:${email}`} className={className} target="_blank">
            {children}
        </a>
    );
};

export default EmailLink;