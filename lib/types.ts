export type AccentColor = 'blue' | 'purple' | 'cyan' | 'emerald';

export interface SystemCredential {
  id: string;
  name: string;
  category: string;
  url: string;
  username: string;
  password: string;
  notes?: string;
  iconName?: string;
}

export interface ConsultantData {
  name: string;
  role: string;
  department: string;
  companyName: string;
  startDate: string;
  welcomeMessage: string;
  contactSupport: string;
  confidentialityNotice: boolean;
  accentColor: AccentColor;
  hidePasswordsInPreview: boolean;
}

export interface QuickTemplate {
  id: string;
  name: string;
  category: string;
  defaultUrl: string;
  iconName: string;
  defaultNotes: string;
  placeholderUser: string;
}
