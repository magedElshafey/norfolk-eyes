export interface TimeLine {
    title: string
    job_discription: string
    description: string[] | string,
    duration: {
        from: string, to: string
    }
}
export interface Exp {
    section: {
        intro: string,
        heading: string,
        description: string,
        details: string[]
        exp_timeline: TimeLine[]
    },
    is_active: boolean
}