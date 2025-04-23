export interface IDrawerStore {
    openDrawer: boolean;
    statusDrawer: string;
    setOpenDrawer: (key: boolean, type?: string) => void;
    objectData: any;
    setObjectData: (objectData: any) => void;
}
