export interface ModernTech {
  intro: string;
  heading: string;
  description: string;
  ending: string;
  details: string[];
  cards: {
    title: string;
    description: string[];
    tags?: string;
    ending?: string;
  }[];
}
