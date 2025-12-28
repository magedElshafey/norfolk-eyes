import type { DoctorProfile } from "../types/doctor.types";

export const doctorPlaceholder: DoctorProfile = {
    name: "Dr. Amelia Carter",
    role: "Consultant Ophthalmologist (UK)",
    registration: "GMC: 1234567",
    photoUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80",

    headline:
        "Specialist eye care with a patient-first approach — combining clinical excellence, modern diagnostics, and clear communication.",
    intro: [
        "Dr. Amelia Carter is a UK-based Consultant Ophthalmologist with a focus on cataract surgery, medical retina, and comprehensive eye health.",
        "Her practice is built around evidence-based care, transparent guidance, and modern patient education — so every patient understands their options and feels confident in their treatment plan.",
    ],

    badges: [
        "Consultant Ophthalmologist",
        "Cataract & Lens Surgery",
        "Medical Retina",
        "Dry Eye & Ocular Surface",
        "Modern patient education"
    ],

    stats: [
        { label: "Years of experience", value: "12+" },
        { label: "Procedures performed", value: "5,000+" },
        { label: "Average patient rating", value: "4.9/5", hint: "Based on clinic reviews" },
        { label: "Typical response time", value: "< 24h", hint: "For booking requests" },
    ],

    specialties: [
        {
            title: "Clinical Specialties",
            items: [
                "Cataract assessment & surgery (standard & premium IOL counselling)",
                "Medical Retina (diabetic eye disease, AMD screening & follow-up)",
                "Glaucoma screening & ongoing monitoring",
                "Dry Eye clinic (MGD, blepharitis, tailored regimens)",
                "Comprehensive eye examinations & preventive care",
            ],
        },
        {
            title: "Patient Services",
            items: [
                "Second opinions and treatment planning",
                "Post-operative aftercare and optimisation",
                "Structured patient education & clear instructions",
                "Lifestyle guidance for long-term eye health",
            ],
        },
    ],

    conditionsTreated: [
        {
            title: "Common conditions",
            items: [
                "Cataract",
                "Dry eye disease",
                "Blepharitis / MGD",
                "Diabetic eye disease",
                "Age-related macular degeneration (screening & monitoring)",
                "Glaucoma suspect / ocular hypertension (screening & follow-up)",
            ],
        },
        {
            title: "Symptoms you can book for",
            items: [
                "Blurry vision or reduced contrast",
                "Glare / halos (especially night driving)",
                "Redness, irritation, foreign body sensation",
                "Flashes or new floaters (requires urgent triage)",
                "Eyestrain and headaches (vision assessment)",
            ],
        },
    ],

    proceduresOffered: [
        {
            title: "Procedures",
            items: [
                "Cataract surgery (micro-incision)",
                "Toric IOL counselling (astigmatism management)",
                "Post-cataract optimisation pathway",
                "Dry eye treatment plans and follow-ups",
            ],
        },
        {
            title: "Diagnostics",
            items: [
                "OCT imaging (retina / optic nerve)",
                "Visual field testing (perimetry)",
                "Fundus photography",
                "Corneal topography (where applicable)",
            ],
        },
    ],

    diagnosticsAndTechnology: {
        title: "Technology & diagnostics",
        points: [
            {
                title: "Modern imaging",
                desc: "High-resolution OCT and retinal imaging to support accurate diagnosis and safer decision-making.",
            },
            {
                title: "Measurable follow-up",
                desc: "Consistent monitoring using repeatable tests so progress is tracked clearly over time.",
            },
            {
                title: "Patient-friendly explanations",
                desc: "Images and results are explained in plain English, with clear next steps and expectations.",
            },
            {
                title: "Structured aftercare",
                desc: "Written aftercare plans that are easy to follow, improving comfort and outcomes.",
            },
        ],
    },

    carePhilosophy: {
        title: "Care philosophy",
        points: [
            {
                title: "Clarity before treatment",
                desc: "You’ll always receive a plain-English explanation, options, risks/benefits, and a shared decision plan.",
            },
            {
                title: "Evidence-based & safe",
                desc: "Decisions are aligned with recognised clinical standards and tailored to the individual patient.",
            },
            {
                title: "Comfort and respect",
                desc: "A calm, supportive experience — from first appointment through follow-up.",
            },
            {
                title: "Education improves outcomes",
                desc: "Simple, structured education reduces anxiety and helps patients follow treatment correctly.",
            },
        ],
    },

    experienceTimeline: [
        {
            year: "2024–Present",
            title: "Consultant Ophthalmologist",
            place: "Private Clinic + NHS sessions",
            desc: "Cataract pathway leadership, surgical lists, retina follow-up clinics, and patient education programs.",
        },
        {
            year: "2021–2024",
            title: "Senior Specialty Doctor / Associate Specialist",
            place: "UK Eye Unit",
            desc: "High-volume cataract service, triage clinics, glaucoma monitoring, and medical retina support.",
        },
        {
            year: "2017–2021",
            title: "Ophthalmology Registrar",
            place: "UK Training Rotation",
            desc: "Subspecialty rotations: cataract, cornea, glaucoma, retina, and emergency eye care.",
        },
        {
            year: "2013–2017",
            title: "Foundation & Core Training",
            place: "UK Hospitals",
            desc: "Broad clinical grounding with early focus on ophthalmology and surgical skills development.",
        },
    ],

    credentials: {
        title: "Qualifications & credentials",
        items: [
            { label: "Medical Degree", value: "MBBS (UK)" },
            { label: "Postgraduate", value: "FRCOphth (or equivalent) — placeholder" },
            { label: "Subspecialty Focus", value: "Cataract, Medical Retina" },
            { label: "Registration", value: "General Medical Council (GMC)" },
            { label: "Indemnity", value: "Medical indemnity in place" },
        ],
    },

    memberships: [
        "Royal College of Ophthalmologists (RCOphth) — placeholder",
        "ESCRS / UKISCRS — placeholder",
        "Local Ophthalmology Society — placeholder",
    ],

    languages: ["English", "Arabic (optional)", "French (optional)"],

    publications: [
        {
            title: "Outcomes of modern cataract pathways: improving patient clarity and satisfaction",
            venue: "Journal / Conference — placeholder",
            year: "2023",
            url: "https://example.com",
        },
        {
            title: "Dry eye management: patient adherence and simplified aftercare plans",
            venue: "Poster / Talk — placeholder",
            year: "2022",
        },
        {
            title: "Retina screening workflow optimisation in mixed practice settings",
            venue: "Audit — placeholder",
            year: "2021",
        },
    ],

    awards: [
        { title: "Clinical Excellence Recognition — placeholder", year: "2024" },
        { title: "Quality Improvement Award — placeholder", year: "2022" },
    ],

    gallery: [
        {
            title: "Clinic experience",
            imageUrl:
                "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
            alt: "Clinic corridor",
        },
        {
            title: "Diagnostics",
            imageUrl:
                "https://images.unsplash.com/photo-1580281657527-47f249e8f272?auto=format&fit=crop&w=1200&q=80",
            alt: "Doctor reviewing imaging",
        },
        {
            title: "Patient consultation",
            imageUrl:
                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
            alt: "Consultation room",
        },
        {
            title: "Clinic experience",
            imageUrl:
                "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
            alt: "Clinic corridor",
        },
        {
            title: "Diagnostics",
            imageUrl:
                "https://images.unsplash.com/photo-1580281657527-47f249e8f272?auto=format&fit=crop&w=1200&q=80",
            alt: "Doctor reviewing imaging",
        },
        {
            title: "Patient consultation",
            imageUrl:
                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
            alt: "Consultation room",
        },
        {
            title: "Clinic experience",
            imageUrl:
                "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
            alt: "Clinic corridor",
        },
        {
            title: "Diagnostics",
            imageUrl:
                "https://images.unsplash.com/photo-1580281657527-47f249e8f272?auto=format&fit=crop&w=1200&q=80",
            alt: "Doctor reviewing imaging",
        },
        {
            title: "Patient consultation",
            imageUrl:
                "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
            alt: "Consultation room",
        },
    ],

    testimonials: [
        {
            quote:
                "Everything was explained clearly and I felt confident with the plan. Surgery and aftercare were smooth and professional.",
            name: "Patient A",
            context: "Cataract surgery",
        },
        {
            quote:
                "The clinic experience was calm and organised. The doctor listened carefully and provided practical steps I could follow.",
            name: "Patient B",
            context: "Dry eye & follow-up",
        },
        {
            quote:
                "I appreciated the detailed explanation and the honest options. Excellent communication and very reassuring.",
            name: "Patient C",
            context: "Retina monitoring",
        },
    ],

    locations: [
        {
            name: "London Clinic (Example)",
            addressLines: ["120 Example Street", "London, UK", "W1A 1AA"],
            mapUrl: "https://maps.google.com",
            phone: "+44 20 0000 0000",
            email: "clinic@example.com",
            openingHours: ["Mon–Fri: 9:00–17:00", "Sat: By appointment", "Sun: Closed"],
            accessibility: ["Step-free access", "Hearing assistance on request"],
        },
        {
            name: "Norfolk Clinic (Example)",
            addressLines: ["45 Example Road", "Norwich, UK", "NR1 1AA"],
            mapUrl: "https://maps.google.com",
            phone: "+44 16 0000 0000",
            email: "norfolk@example.com",
            openingHours: ["Mon–Fri: 9:00–17:00", "Sat: By appointment", "Sun: Closed"],
            accessibility: ["Step-free access"],
        },
    ],

    feesAndReferrals: {
        title: "Fees, insurance & referrals",
        items: [
            {
                title: "Self-pay",
                desc: "Transparent pricing and clear treatment plans. Quotes confirmed after assessment.",
            },
            {
                title: "Insured patients",
                desc: "Where supported, the clinic team can advise on insurer paperwork and authorisations.",
            },
            {
                title: "GP / optometrist referrals",
                desc: "Referrals are welcome. Bring any letters, scans, or previous prescriptions to your appointment.",
            },
            {
                title: "Second opinions",
                desc: "Structured review of your diagnosis and options, with written summary if needed.",
            },
        ],
        note: "Exact availability and coverage depend on clinic arrangements. Replace with your real policy later.",
    },

    whatToExpect: {
        title: "What to expect at your first visit",
        steps: [
            {
                title: "1) Intake & history",
                desc: "We review symptoms, medical history, medications, and any previous eye care records.",
            },
            {
                title: "2) Diagnostic testing",
                desc: "As needed: imaging (OCT), eye pressure measurement, retinal photos, and vision checks.",
            },
            {
                title: "3) Consultation & plan",
                desc: "Results explained clearly, treatment options discussed, and a plan agreed together.",
            },
            {
                title: "4) Follow-up & aftercare",
                desc: "You receive written steps and guidance. Follow-up timing depends on findings.",
            },
        ],
    },

    faqs: [
        {
            q: "Do I need a referral to book?",
            a: "In many private settings you can self-refer. GP/optometrist referrals are also welcome.",
        },
        {
            q: "What should I bring to my appointment?",
            a: "Bring your glasses/contact lens details, any previous letters/scans, a medication list, and relevant medical history.",
        },
        {
            q: "Will my eyes be dilated?",
            a: "Sometimes. If dilation is needed, you may have blurred vision for a few hours; consider arranging transport.",
        },
        {
            q: "How quickly will I get results?",
            a: "Most test results are discussed during the visit. If further review is needed, the clinic will advise timelines.",
        },
    ],

    ctas: {
        primary: { label: "Book an appointment", href: "/book" },
        secondary: { label: "Contact the clinic", href: "/contact" },
    },

    compliance: {
        medicalDisclaimer:
            "This website provides general information only and does not replace a face-to-face consultation, diagnosis, or urgent medical advice.",
        emergency:
            "If you have sudden vision loss, severe eye pain, flashes/floaters, or injury — seek urgent care immediately (NHS 111 / A&E as appropriate).",
        complaints:
            "If you are unhappy with any aspect of care, please contact the clinic so concerns can be addressed promptly and fairly (replace with your official process).",
    },
};
