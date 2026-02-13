import type { Metadata } from 'next';
import { contactPage } from '@/content/pages';
import { ContactPageContent } from './content';

export const metadata: Metadata = {
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
};

export default function Contact() {
  return <ContactPageContent />;
}
