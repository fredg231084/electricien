import { siteConfig } from '@/site.config';

export function HeadInjection() {
  const headScript = siteConfig.scripts.headInjection;

  if (!headScript) {
    return null;
  }

  return <div dangerouslySetInnerHTML={{ __html: headScript }} />;
}
