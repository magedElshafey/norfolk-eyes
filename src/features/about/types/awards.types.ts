
export interface Awards {
    section: {
        intro: string,
        heading: string,
        description: string,
        details: string[]
        cards: { title: string, description: string[], year: string }[]
    },
    is_active: boolean
}