import { generateMetadata as genMeta } from '@/lib/seo';
import { contactPage } from '@/content/pages';
import { ContactPageContent } from './content';

export const metadata = genMeta({
  metaTitle: contactPage.metaTitle,
  metaDescription: contactPage.metaDescription,
  path: '/contact',
});

export default function Contact() {
  return <ContactPageContent />;
}
