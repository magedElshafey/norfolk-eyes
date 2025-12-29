
export interface AboutServices {
    section: {
        intro: string,
        heading: string,
        description: string,
        details: string[]
        cards: { title: string, description: string[] }[]
    },
    is_active: boolean
}