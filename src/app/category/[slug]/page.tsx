import { notFound } from 'next/navigation';
import data from '@/data/media_updated.json';
import CategoryPageClient from '@/components/CategoryPageClient';
import type { Category } from '@/lib/types';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params; // <-- ici on await params

  const createSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

  const category = (data.categories as Category[]).find(
    (c) => createSlug(c.name) === slug
  );

  if (!category) {
    notFound();
  }

  return <CategoryPageClient category={category} />;
}

export async function generateStaticParams() {
  const createSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-');

  return (data.categories as Category[]).map((category) => ({
    slug: createSlug(category.name),
  }));
}



