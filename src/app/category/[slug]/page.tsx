import { notFound } from 'next/navigation';
import data from '@/data/media_updated.json';
import CategoryPageClient from '@/components/CategoryPageClient';
import type { Category } from '@/lib/types';

type Props = {
    params: Promise<{ slug: string }> | { slug: string }
};

function createSlug(name: string) {
  return name
    .normalize('NFD')                     // enlève les accents
    .replace(/[\u0300-\u036f]/g, '')     // enlève les diacritiques
    .toLowerCase()
    .replace(/\s+/g, '-');               // remplace les espaces par des tirets
}

export default async function CategoryPage({ params }: Props) {
    const resolvedParams = await params;  
  const { slug } = resolvedParams;

  const categories = data.categories as Category[];

  const category = categories.find(
    (c) => createSlug(c.name) === slug
  );

  if (!category) {
    notFound();
  }

  return <CategoryPageClient category={category} />;
}

export async function generateStaticParams() {
  const categories = data.categories as Category[];

  return categories.map((category) => ({
    slug: createSlug(category.name),
  }));
}




