export interface ContactDetails {
  section: {
    intro: string;
    heading: string;
    description: string;
    ending: string;
    details: string[];
  };
  contact_info: {
    clinic_address: string;
    clinic_phone: string;
    clinic_email: string;
    opening_hours: string;
  };
  map_info: {
    google_map_url: string;
  };
  is_active: boolean
}
