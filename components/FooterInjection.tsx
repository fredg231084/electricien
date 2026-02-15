import { siteConfig } from '@/site.config';

export function FooterInjection() {
  const footerScript = siteConfig.scripts.footerInjection;

  if (!footerScript) {
    return null;
  }

  return <div dangerouslySetInnerHTML={{ __html: footerScript }} />;
}
