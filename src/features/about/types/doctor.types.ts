export type Badge = { label: string };
export type Stat = { label: string; value: string; hint?: string };

export type TimelineItem = {
    year: string;
    title: string;
    place?: string;
    desc?: string;
};

export type Publication = {
    title: string;
    venue?: string;
    year?: string;
    url?: string;
};

export type Testimonial = { quote: string; name: string; context?: string };

export type Location = {
    name: string;
    addressLines: string[];
    mapUrl?: string;
    phone?: string;
    email?: string;
    openingHours?: string[];
    accessibility?: string[];
};

export type FaqItem = { q: string; a: string };

export type ServiceGroup = {
    title: string;
    items: string[];
};

export type FeaturePoint = { title: string; desc: string };

export type DoctorProfile = {
    name: string;
    role: string;
    registration?: string; // e.g. GMC number
    photoUrl?: string;

    headline: string;
    intro: string[];

    badges: string[];
    stats: Stat[];

    specialties: ServiceGroup[];
    conditionsTreated: ServiceGroup[];
    proceduresOffered: ServiceGroup[];

    diagnosticsAndTechnology: {
        title: string;
        points: FeaturePoint[];
    };

    carePhilosophy: {
        title: string;
        points: FeaturePoint[];
    };

    experienceTimeline: TimelineItem[];

    credentials: {
        title: string;
        items: { label: string; value: string }[];
    };

    memberships: string[];
    languages: string[];

    publications: Publication[];
    awards: { title: string; year?: string; desc?: string }[];

    gallery: { title: string; imageUrl: string; alt: string }[];

    testimonials: Testimonial[];

    locations: Location[];

    feesAndReferrals: {
        title: string;
        items: FeaturePoint[];
        note?: string;
    };

    whatToExpect: {
        title: string;
        steps: { title: string; desc: string }[];
    };

    faqs: FaqItem[];

    ctas: {
        primary: { label: string; href: string };
        secondary: { label: string; href: string };
    };

    compliance: {
        medicalDisclaimer: string;
        emergency: string;
        complaints?: string;
    };
};
