export interface Setting {
  app_name: string;
  app_description: string;
  app_logo: string | null;
  app_favicon: string | null;
  app_url: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  support_email: string;
  social_facebook: string | null;
  social_twitter: string | null;
  social_instagram: string | null;
  social_linkedin: string | null;
  social_github: string | null;
  social_youtube: string | null;
  maintenance_mode: boolean;
  copyright_text: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_image: string;
  google_analytics_id: string;
  google_map_url: string;
  business_hours: string;
}
