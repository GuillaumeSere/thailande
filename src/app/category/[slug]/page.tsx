// src/app/category/[slug]/page.tsx

import data from '@/data/media_updated.json';
import { notFound } from 'next/navigation';
import type { Category } from '@/lib/types';
import CategoryPageClient from '@/components/CategoryPageClient';

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const createSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  const category = (data.categories as Category[]).find(
    (c) => createSlug(c.name) === params.slug
  );

  if (!category) {
    notFound();
  }

  return <CategoryPageClient category={category} />;
}

export async function generateStaticParams() {
  const createSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  return (data.categories as Category[]).map((category) => ({
    params: {
      slug: createSlug(category.name),
    },
  }));
}
