export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  twitterHandle?: string;
  avatarUrl?: string;
  notes?: string;
  favorite: boolean;
}

export interface ContactFormProps {
  contact?: Contact;
  onSubmit: (contact: Omit<Contact, 'id'>) => Promise<string>;
}