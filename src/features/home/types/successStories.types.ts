export interface Revs {
  section: {
    intro: string;
    heading: string;
    description: string;
    ending: string;
  };
  reviews: Reviews[];
  is_active: boolean
}
export interface Reviews {
  id: number;
  user_name: string;
  user_email: string;
  rating: number;
  title: string;
  content: string;
}
