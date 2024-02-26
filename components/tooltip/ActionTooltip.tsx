'use client'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

interface ActionTooltipProps {
    label: React.ReactNode;
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left"
    align?: "start" | "center" | "end"
}

export const ActionTooltip = ({
    label,
    children,
    side,
    align
}: ActionTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align} className='w-fit py-4 px-4 rounded-2xl'>
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}