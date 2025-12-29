export interface Qul {
    is_active: boolean,
    section: {
        intro: string,
        heading: string,
        description: string,
        list: {
            title: string,
            description: string
        }[]
    }
}