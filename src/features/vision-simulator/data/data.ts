
export type VisionSceneId = "night-driving" | "evening";

export type VisionConditionId =
  | "cataracts"
  | "cataracts-astigmatism"
  | "presbyopia-astigmatism"
  | "presbyopia";

export type LensId = "monofocal" | "galaxy-toric" | "emv" | "trifocal";

export type VisionVideo = {
  src?: string; // صورة واحدة عادية (optional)
  frames?: string[]; // 👈 مجموعة الصور اللي هتتحرك
  fps?: number; // اختياري: عدد الفريمات في الثانية
  label?: string;
};

export type VisionVideoPair = {
  before?: VisionVideo; // override خاص بالعدسة (اختياري)
  after?: VisionVideo; // بعد العملية / مع العدسة
};

/**
 * videos الخاصة بكل condition في scene معيّن:
 * - before: قبل العملية (عام للحالة)
 * - لكل عدسة: VisionVideoPair (before/after اختياريين)
 */
export type ConditionSceneVideos = {
  before?: VisionVideo; // 👈 عام للحالة (قبل العملية)
} & Partial<Record<LensId, VisionVideoPair>>;

export type LensConfig = {
  id: LensId;
  label: string;
  shortLabel: string;
  description: string;
};

export type ConditionConfig = {
  id: VisionConditionId;
  label: string;
  description: string;
};

export type SceneConfig = {
  id: VisionSceneId;
  label: string;
  description: string;
  videos: Record<VisionConditionId, ConditionSceneVideos>;
};

export type VisionConfig = {
  scenes: SceneConfig[];
  conditions: ConditionConfig[];
  lenses: LensConfig[];
  is_active: boolean
};

export const visionConfig: VisionConfig = {
  lenses: [
    {
      id: "monofocal",
      label: "Monofocal IOL",
      shortLabel: "Monofocal",
      description:
        "Standard monofocal lens providing clear distance vision only.",
    },
    {
      id: "galaxy-toric",
      label: "Galaxy Trifocal Toric IOL",
      shortLabel: "Galaxy Toric",
      description: "Galaxy trifocal lens with astigmatism correction.",
    },
    {
      id: "trifocal",
      label: "trifocal",
      shortLabel: "trifocal",
      description:
        "Standard trifocal lens providing clear distance vision only.",
    },
    {
      id: "emv",
      label: "rayone EMV Toric",
      shortLabel: "EMV Toric",
      description: "EMV lens with astigmatism correction.",
    },
  ],

  conditions: [
    {
      id: "cataracts",
      label: "Cataract",
      description:
        "Cloudy, blurred vision simulating cataract before and after surgery.",
    },
    {
      id: "cataracts-astigmatism",
      label: "Cataract & astigmatism",
      description:
        "Cloudy, blurred vision simulating cataract before and after surgery.",
    },
    {
      id: "presbyopia",
      label: "presbyopia",
      description:
        "Cloudy, blurred vision simulating cataract before and after surgery.",
    },
    {
      id: "presbyopia-astigmatism",
      label: "presbyopia & astigmatism",
      description:
        "Cloudy, blurred vision simulating cataract before and after surgery.",
    },
  ],

  scenes: [
    {
      id: "night-driving",
      label: "Night driving",
      description: "Street lights, headlights and halo/glare simulation.",
      videos: {
        cataracts: {
          before: {
            src: "https://static.wixstatic.com/media/ef149a_875cb69ec0674d23b5f73d18d8c1498ff000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_875cb69ec0674d23b5f73d18d8c1498ff000.jpg",
            label: "Before surgery",
          },
          monofocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_8712689944b64b28a706d7792e878e0af000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_8712689944b64b28a706d7792e878e0af000.jpg",
              label: "After monofocal IOL",
            },
          },

          "galaxy-toric": {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_8712689944b64b28a706d7792e878e0af000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_8712689944b64b28a706d7792e878e0af000.jpg",
              label: "After Galaxy Toric",
            },
          },
          emv: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_8b025253e8024f4a8f28ddda591a7c50f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_8b025253e8024f4a8f28ddda591a7c50f000.jpg",
              label: "After EMV Toric",
            },
          },
          trifocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_4e6c447a87614cb087c2bfdc9917f11af000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_4e6c447a87614cb087c2bfdc9917f11af000.jpg",
              label: "After trifocal Toric",
            },
          },
        },
        "presbyopia-astigmatism": {
          before: {
            src: "https://static.wixstatic.com/media/ef149a_e947b357ba8d4d7382ecbf563e5baa98f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_e947b357ba8d4d7382ecbf563e5baa98f000.jpg",
            label: "Before surgery",
          },
          monofocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_cf535d506f9e4fafb3bfb7bda90d2cdaf000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_cf535d506f9e4fafb3bfb7bda90d2cdaf000.jpg",
              label: "After monofocal IOL",
            },
          },

          "galaxy-toric": {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_8712689944b64b28a706d7792e878e0af000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_8712689944b64b28a706d7792e878e0af000.jpg",
              label: "After Galaxy Toric",
            },
          },
          emv: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_8b025253e8024f4a8f28ddda591a7c50f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_8b025253e8024f4a8f28ddda591a7c50f000.jpg",
              label: "After EMV Toric",
            },
          },
          trifocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_4e6c447a87614cb087c2bfdc9917f11af000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_4e6c447a87614cb087c2bfdc9917f11af000.jpg",
              label: "After trifocal Toric",
            },
          },
        },
        "cataracts-astigmatism": {
          before: {
            src: "https://static.wixstatic.com/media/ef149a_7e8f2b911c9745619210bcbdf43b28e2f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_7e8f2b911c9745619210bcbdf43b28e2f000.jpg",
            label: "Before surgery",
          },
          monofocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_cf535d506f9e4fafb3bfb7bda90d2cdaf000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_cf535d506f9e4fafb3bfb7bda90d2cdaf000.jpg",
              label: "After monofocal IOL",
            },
          },

          "galaxy-toric": {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_8712689944b64b28a706d7792e878e0af000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_8712689944b64b28a706d7792e878e0af000.jpg",
              label: "After Galaxy Toric",
            },
          },
          emv: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_8b025253e8024f4a8f28ddda591a7c50f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_8b025253e8024f4a8f28ddda591a7c50f000.jpg",
              label: "After EMV Toric",
            },
          },
          trifocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_4e6c447a87614cb087c2bfdc9917f11af000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_4e6c447a87614cb087c2bfdc9917f11af000.jpg",
              label: "After trifocal Toric",
            },
          },
        },
        presbyopia: {
          before: {
            src: "https://static.wixstatic.com/media/ef149a_4dc90cca0437466cb38b103fdba23bcbf000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_4dc90cca0437466cb38b103fdba23bcbf000.jpg",
            label: "Before surgery",
          },
          monofocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_cf535d506f9e4fafb3bfb7bda90d2cdaf000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_cf535d506f9e4fafb3bfb7bda90d2cdaf000.jpg",
              label: "After monofocal IOL",
            },
          },

          "galaxy-toric": {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_8712689944b64b28a706d7792e878e0af000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_8712689944b64b28a706d7792e878e0af000.jpg",
              label: "After Galaxy Toric",
            },
          },
          emv: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_8b025253e8024f4a8f28ddda591a7c50f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_8b025253e8024f4a8f28ddda591a7c50f000.jpg",
              label: "After EMV Toric",
            },
          },
          trifocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_4e6c447a87614cb087c2bfdc9917f11af000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_4e6c447a87614cb087c2bfdc9917f11af000.jpg",
              label: "After trifocal Toric",
            },
          },
        },
      },
    },
    {
      id: "evening",
      label: "evening",
      description: "Street lights, headlights and halo/glare simulation.",
      videos: {
        cataracts: {
          before: {
            src: "https://static.wixstatic.com/media/ef149a_18cf090b819c4f35a5f9e5918671eb69f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_18cf090b819c4f35a5f9e5918671eb69f000.jpg",
            label: "Before surgery",
          },
          monofocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_2dc4bd149b724a4a8a36f1bb9a31dd5cf000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_2dc4bd149b724a4a8a36f1bb9a31dd5cf000.jpg",
              label: "After monofocal IOL",
            },
          },

          "galaxy-toric": {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_90889e767204499082bf3d18dcdf9a84f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_90889e767204499082bf3d18dcdf9a84f000.jpg",
              label: "After Galaxy Toric",
            },
          },
          emv: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_3e8be52a05844bd0a232e5a022ff2165f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_3e8be52a05844bd0a232e5a022ff2165f000.jpg",
              label: "After EMV Toric",
            },
          },
          trifocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_264e3645cc7b4320a3f1b97ef4405285f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_264e3645cc7b4320a3f1b97ef4405285f000.jpg",
              label: "After trifocal Toric",
            },
          },
        },
        "presbyopia-astigmatism": {
          before: {
            src: "https://static.wixstatic.com/media/ef149a_ac5dfb8d67374fc3b5d6106939bdc99bf000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_ac5dfb8d67374fc3b5d6106939bdc99bf000.jpg",
            label: "Before surgery",
          },
          monofocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_2dc4bd149b724a4a8a36f1bb9a31dd5cf000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_2dc4bd149b724a4a8a36f1bb9a31dd5cf000.jpg",
              label: "After monofocal IOL",
            },
          },

          "galaxy-toric": {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_90889e767204499082bf3d18dcdf9a84f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_90889e767204499082bf3d18dcdf9a84f000.jpg",
              label: "After Galaxy Toric",
            },
          },
          emv: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_3e8be52a05844bd0a232e5a022ff2165f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_3e8be52a05844bd0a232e5a022ff2165f000.jpg",
              label: "After EMV Toric",
            },
          },
          trifocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_264e3645cc7b4320a3f1b97ef4405285f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_264e3645cc7b4320a3f1b97ef4405285f000.jpg",
              label: "After trifocal Toric",
            },
          },
        },
        "cataracts-astigmatism": {
          before: {
            src: "https://static.wixstatic.com/media/ef149a_0a9ec55531ca4967a9f055e38bb32d36f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_0a9ec55531ca4967a9f055e38bb32d36f000.jpg",
            label: "Before surgery",
          },
          monofocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_2dc4bd149b724a4a8a36f1bb9a31dd5cf000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_2dc4bd149b724a4a8a36f1bb9a31dd5cf000.jpg",
              label: "After monofocal IOL",
            },
          },

          "galaxy-toric": {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_90889e767204499082bf3d18dcdf9a84f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_90889e767204499082bf3d18dcdf9a84f000.jpg",
              label: "After Galaxy Toric",
            },
          },
          emv: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_3e8be52a05844bd0a232e5a022ff2165f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_auto/ef149a_3e8be52a05844bd0a232e5a022ff2165f000.jpg",
              label: "After EMV Toric",
            },
          },
          trifocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_264e3645cc7b4320a3f1b97ef4405285f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_264e3645cc7b4320a3f1b97ef4405285f000.jpg",
              label: "After trifocal Toric",
            },
          },
        },
        presbyopia: {
          before: {
            src: "https://static.wixstatic.com/media/ef149a_9a6e14defa4441ef94dd5944c607f9c7f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_9a6e14defa4441ef94dd5944c607f9c7f000.jpg",
            label: "Before surgery",
          },
          monofocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_2dc4bd149b724a4a8a36f1bb9a31dd5cf000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_auto/ef149a_2dc4bd149b724a4a8a36f1bb9a31dd5cf000.jpg",
              label: "After monofocal IOL",
            },
          },

          "galaxy-toric": {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_90889e767204499082bf3d18dcdf9a84f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_90889e767204499082bf3d18dcdf9a84f000.jpg",
              label: "After Galaxy Toric",
            },
          },
          emv: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_3e8be52a05844bd0a232e5a022ff2165f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_3e8be52a05844bd0a232e5a022ff2165f000.jpg",
              label: "After EMV Toric",
            },
          },
          trifocal: {
            after: {
              src: "https://static.wixstatic.com/media/ef149a_264e3645cc7b4320a3f1b97ef4405285f000.jpg/v1/fill/w_1842,h_718,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/ef149a_264e3645cc7b4320a3f1b97ef4405285f000.jpg",
              label: "After trifocal Toric",
            },
          },
        },
      },
    },
    // scene evening نفس الفكرة...
  ],
  is_active: true
};
