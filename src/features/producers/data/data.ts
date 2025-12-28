export type ProcedureTag =
  | "laser"
  | "cataract"
  | "lens"
  | "cosmetic"
  | "corneal"
  | "glaucoma"
  | "retina";

export type ProcedureItem = {
  id: string;
  nameKey: string; // i18n key
  defaultName: string;
  slug: string; // route path
  summaryKey: string;
  defaultSummary: string;
  tags: ProcedureTag[];
};

export type ProcedureCategory = {
  id: string;
  nameKey: string;
  defaultName: string;
  descriptionKey: string;
  defaultDescription: string;
  items: ProcedureItem[];
};

export const procedureCategories: ProcedureCategory[] = [
  {
    id: "laser-vision",
    nameKey: "Procedures.laserVision.title",
    defaultName: "Laser Vision Correction",
    descriptionKey: "Procedures.laserVision.desc",
    defaultDescription:
      "Treat short-sightedness, long-sightedness and astigmatism with advanced laser techniques.",
    items: [
      {
        id: "lasik",
        nameKey: "Procedures.lasik.title",
        defaultName: "LASIK / Femto-LASIK",
        slug: "laser-vision-correction/lasik",
        summaryKey: "Procedures.lasik.summary",
        defaultSummary:
          "A popular laser procedure that reshapes the cornea to reduce dependence on glasses or contact lenses.",
        tags: ["laser"],
      },
      {
        id: "smile",
        nameKey: "Procedures.smile.title",
        defaultName: "SMILE® / keyhole laser",
        slug: "laser-vision-correction/smile",
        summaryKey: "Procedures.smile.summary",
        defaultSummary:
          "Minimally invasive laser vision correction through a tiny keyhole incision in the cornea.",
        tags: ["laser"],
      },
      {
        id: "smile",
        nameKey: "Procedures.smile.title",
        defaultName: "SMILE® / keyhole laser",
        slug: "laser-vision-correction/smile",
        summaryKey: "Procedures.smile.summary",
        defaultSummary:
          "Minimally invasive laser vision correction through a tiny keyhole incision in the cornea.",
        tags: ["laser"],
      },
    ],
  },
  {
    id: "cataract",
    nameKey: "Procedures.cataract.title",
    defaultName: "Cataract Surgery",
    descriptionKey: "Procedures.cataract.desc",
    defaultDescription:
      "Restore clarity by removing cloudy lenses and replacing them with clear intraocular lenses.",
    items: [
      {
        id: "standard-cataract",
        nameKey: "Procedures.standardCataract.title",
        defaultName: "Standard cataract surgery",
        slug: "cataracts/standard-cataract-surgery",
        summaryKey: "Procedures.standardCataract.summary",
        defaultSummary:
          "Removal of the cloudy natural lens and implantation of a clear monofocal lens for distance vision.",
        tags: ["cataract", "lens"],
      },
      {
        id: "premium-cataract",
        nameKey: "Procedures.premiumCataract.title",
        defaultName: "Premium cataract & lens options",
        slug: "cataracts/premium-lens-options",
        summaryKey: "Procedures.premiumCataract.summary",
        defaultSummary:
          "Advanced multifocal, EDOF and toric lenses to reduce your dependence on glasses after cataract surgery.",
        tags: ["cataract", "lens"],
      },
      {
        id: "smile",
        nameKey: "Procedures.smile.title",
        defaultName: "SMILE® / keyhole laser",
        slug: "laser-vision-correction/smile",
        summaryKey: "Procedures.smile.summary",
        defaultSummary:
          "Minimally invasive laser vision correction through a tiny keyhole incision in the cornea.",
        tags: ["laser"],
      },
    ],
  },
  {
    id: "lens-replacement",
    nameKey: "Procedures.lensReplacement.title",
    defaultName: "Lens Replacement & Presbyopia",
    descriptionKey: "Procedures.lensReplacement.desc",
    defaultDescription:
      "Options to correct presbyopia and higher prescriptions when laser is not suitable.",
    items: [
      {
        id: "refractive-lens-exchange",
        nameKey: "Procedures.rle.title",
        defaultName: "Refractive lens exchange (RLE)",
        slug: "lens-replacement-surgery/refractive-lens-exchange",
        summaryKey: "Procedures.rle.summary",
        defaultSummary:
          "Replacement of the natural lens with a premium lens implant to address distance and near vision.",
        tags: ["lens"],
      },
      {
        id: "presbyopia-lens",
        nameKey: "Procedures.presbyopiaLens.title",
        defaultName: "Presbyopia-correcting lenses",
        slug: "lens-replacement-surgery/presbyopia-lenses",
        summaryKey: "Procedures.presbyopiaLens.summary",
        defaultSummary:
          "Trifocal and EDOF lenses designed to improve near, intermediate and distance vision.",
        tags: ["lens"],
      },
      {
        id: "smile",
        nameKey: "Procedures.smile.title",
        defaultName: "SMILE® / keyhole laser",
        slug: "laser-vision-correction/smile",
        summaryKey: "Procedures.smile.summary",
        defaultSummary:
          "Minimally invasive laser vision correction through a tiny keyhole incision in the cornea.",
        tags: ["laser"],
      },
    ],
  },
  {
    id: "cosmetic-oculoplastic",
    nameKey: "Procedures.cosmetic.title",
    defaultName: "Cosmetic & Oculoplastic",
    descriptionKey: "Procedures.cosmetic.desc",
    defaultDescription:
      "Eyelid, tear-duct and cosmetic procedures to improve comfort, function and appearance.",
    items: [
      {
        id: "blepharoplasty",
        nameKey: "Procedures.bleph.title",
        defaultName: "Upper & lower eyelid surgery",
        slug: "cosmetic-oculoplastic/eyelid-surgery",
        summaryKey: "Procedures.bleph.summary",
        defaultSummary:
          "Eyelid surgery to address droopy lids, puffiness or visual obstruction from excess skin.",
        tags: ["cosmetic"],
      },
      {
        id: "ptosis",
        nameKey: "Procedures.ptosis.title",
        defaultName: "Ptosis correction",
        slug: "cosmetic-oculoplastic/ptosis-correction",
        summaryKey: "Procedures.ptosis.summary",
        defaultSummary:
          "Specialist procedures to lift a drooping upper eyelid and improve the visual axis.",
        tags: ["cosmetic"],
      },
      {
        id: "smile",
        nameKey: "Procedures.smile.title",
        defaultName: "SMILE® / keyhole laser",
        slug: "laser-vision-correction/smile",
        summaryKey: "Procedures.smile.summary",
        defaultSummary:
          "Minimally invasive laser vision correction through a tiny keyhole incision in the cornea.",
        tags: ["laser"],
      },
    ],
  },
];
