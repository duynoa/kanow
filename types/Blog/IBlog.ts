interface IDetailNewsEvents {
    id: number | string,
    title: string,
    descption: string,
    content: string,
    image: string,
    created_at: string,
    slug?: any
}

type IListNewsEvents = IDetailNewsEvents[]
interface IDetailCareer {
    id: number,
    title: string,
    infomation: {
        salary: string,
        experience: string,
        working_form: string,
        degree: string,
        gender: string,
        quantity: string,
        address: string
    },
    descption: string,
    content: string,
    job_requirement: string,
    your_benefit: string,
    created_at: string,
    slug?: any,
}
type IListCareer = IDetailCareer[]


export type {
    IListNewsEvents,
    IDetailNewsEvents,
    IListCareer,
    IDetailCareer,
};
