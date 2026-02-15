import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, Tag } from 'lucide-react';
import { siteConfig } from '@/site.config';
import { getAllBlogPosts } from '@/content/blog';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';

export const metadata: Metadata = {
  title: `Blog électricité | Conseils d'expert - ${siteConfig.business.name}`,
  description: 'Découvrez nos articles sur l\'électricité résidentielle et commerciale au Québec. Conseils d\'experts, guides pratiques, tendances et actualités.',
  alternates: {
    canonical: `https://${siteConfig.business.domain}/blog`,
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: `Blog électricité | Conseils d'expert - ${siteConfig.business.name}`,
    description: 'Découvrez nos articles sur l\'électricité résidentielle et commerciale au Québec. Conseils d\'experts, guides pratiques, tendances et actualités.',
    url: `https://${siteConfig.business.domain}/blog`,
    siteName: siteConfig.business.name,
    locale: siteConfig.seo.locale,
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Blog', url: '/blog' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />

      <section className="relative overflow-hidden bg-gradient-hero bg-mesh pt-32 pb-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
            Blog <span className="text-gradient">Électricité</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Conseils d'experts, guides pratiques et actualités sur l'électricité résidentielle et commerciale au Québec.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group glass-card p-6 rounded-2xl hover:shadow-xl hover:border-primary/20 transition-all"
              >
                <div className="flex items-center gap-2 text-xs text-primary font-medium mb-3">
                  <Tag className="h-3 w-3" />
                  {post.category}
                </div>

                <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.publishedDate).toLocaleDateString('fr-CA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime} min
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
