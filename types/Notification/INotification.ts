interface INotification {
    id: number,
    object_id: number,
    object_type: string,
    title: string,
    content: string,
    created_at: string,
    is_read: number,
    customer_id: number,
    json_data: {
        transaction_id: number,
        object: string,
        type?: number,
        status?: number,
    }
}

export type {
    INotification
};