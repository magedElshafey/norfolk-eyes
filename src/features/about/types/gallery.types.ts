export interface AboutGallery {
    is_active: boolean,
    section: {
        intro: string
        heading: string
        description: string,
        image_gallery: {
            title: string,
            description: string,
            image?: string
        }[]
    }
}