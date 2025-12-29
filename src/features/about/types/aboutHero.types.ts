export interface Card {
    tags: string,
    title: string,
    description: string,
    ending: string,
}
export interface AboutDoc {
    section: {
        intro: string,
        heading: string,
        description: string,
        details: string[]
        cards: Card[]
        job_title?: string
        image?: string
    },
    is_active: boolean
}