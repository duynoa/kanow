interface INotification {
    id: number,
    object_id: number,
    object_type: string,
    title: string,
    content: string,
    created_at: string,
    is_read: number,
    customer_id: number
}

export type {
    INotification
};