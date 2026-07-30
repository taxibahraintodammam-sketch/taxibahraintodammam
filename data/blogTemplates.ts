export interface BlogTemplate {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
}

// No canned drafts ship by default — add entries here when there are real
// article templates to bulk-generate from /admin/generator.
export const BLOG_TEMPLATES: BlogTemplate[] = [];
