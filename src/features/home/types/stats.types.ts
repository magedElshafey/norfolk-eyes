export interface Stats {
  section: {
    intro: string;
    heading: string;
    description: string;
    ending: string;
    stats: {
      label: string;
      number: string;
      suffix?: string;
      description: string;
    }[];
  };
  is_active: boolean
}
