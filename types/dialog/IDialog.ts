export interface IOpenDialogCustom {
    openDialogCustom: boolean;
    statusDialog: string;
    setStatusDialog: (type: string) => void;
    setOpenDialogCustom: (key: boolean) => void;
}
