import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, ArrowLeft, Phone } from 'lucide-react';
import { siteConfig } from '@/site.config';
import { getAllBlogPosts, getBlogPost } from '@/content/blog';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { CTAStrip } from '@/components/CTAStrip';

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const post = getBlogPost(params.slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `https://${siteConfig.business.domain}/blog/${post.slug}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://${siteConfig.business.domain}/blog/${post.slug}`,
      siteName: siteConfig.business.name,
      locale: siteConfig.seo.locale,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate || post.publishedDate,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

function ArticleSchema({ post }: { post: any }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: `https://${siteConfig.business.domain}${siteConfig.seo.defaultOgImage}`,
    datePublished: post.publishedDate,
    dateModified: post.modifiedDate || post.publishedDate,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: `https://${siteConfig.business.domain}`,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.business.name,
      url: `https://${siteConfig.business.domain}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  const phone = siteConfig.contact.phone.main;

  return (
    <>
      <ArticleSchema post={post} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <article className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-primary font-medium mb-6 hover:gap-3 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>

          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">{post.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedDate).toLocaleDateString('fr-CA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime} min de lecture
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-muted/30 p-6 rounded-2xl mb-8 border-l-4 border-primary">
              <p className="text-base leading-relaxed m-0">{post.content.intro}</p>
            </div>

            {post.content.sections.map((section, idx) => (
              <div key={idx} className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{section.content}</p>
                {section.list && (
                  <ul className="space-y-2">
                    {section.list.map((item, i) => (
                      <li key={i} className="text-muted-foreground leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="bg-gradient-hero bg-mesh p-8 rounded-2xl mb-8">
              <p className="text-lg leading-relaxed font-medium text-foreground m-0">{post.content.conclusion}</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <div className="glass-card p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-4">Besoin d'aide pour votre projet électrique?</h3>
              <p className="text-muted-foreground mb-6">
                Contactez nos experts pour une évaluation gratuite et des conseils personnalisés.
              </p>
              <a href={phone.tel} className="btn-primary inline-flex text-lg">
                <Phone className="h-5 w-5" />
                {phone.display}
              </a>
            </div>
          </div>
        </div>
      </article>

      <CTAStrip />
    </>
  );
}
