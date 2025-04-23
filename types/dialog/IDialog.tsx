interface IOpenDialogCustom {
    openDialogCustom: boolean;
    statusDialog: string;
    setStatusDialog: (type: any) => void;
    setOpenDialogCustom: (key: any) => void;
}

export type {
    IOpenDialogCustom
}