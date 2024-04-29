import { OBJSlect } from "../ICommon";

interface Obj {
    value: string;
    label: string;
}
export interface StateSeltSetTime {
    bookCarQuickly: {
        wordLimit: OBJSlect[];
        until: OBJSlect[];
    };
    deliver: Obj[] | [];
    receive: Obj[] | [];
}
