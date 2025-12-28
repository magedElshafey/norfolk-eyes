export interface PreVisit {
  left_section: {
    intro: string;
    heading: string;
    description: string;
    ending: string;
    steps: Step[];
  };
  right_section: {
    intro: string;
    heading: string;
    description: string;
    ending: string;
    details: string[];
  };
  is_active: boolean
}
export interface Step {
  step_number: number;
  title: string;
  description: string;
}
