interface OBJSlect {
    value: number;
    label: string;
}
export interface StateSeltSetTime {
    bookCarQuickly: {
        wordLimit: OBJSlect[];
        until: OBJSlect[];
    };
    deliver: {
        value: string;
        label: string;
    }[];
    receive: {
        value: string;
        label: string;
    }[];
}
