export type VisionSceneId = string;
export type VisionConditionId = string;
export type LensId = string;

export type VisionVideo = {
    src?: string;
    frames?: string[];
    fps?: number;
    label?: string;
};

export type VisionVideoPair = {
    before?: VisionVideo;
    after?: VisionVideo;
};

export type ConditionSceneVideos = {
    before?: VisionVideo;
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
    is_active: boolean;
};
