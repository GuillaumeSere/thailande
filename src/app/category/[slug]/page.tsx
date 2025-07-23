import data from '../../../data/media_updated.json';
import { notFound } from 'next/navigation';
import type { Category } from '../../../lib/types';
import CategoryPageClient from '../../../components/CategoryPageClient';

type CategoryPageProps = {
  params: {
    slug: string;
  };
};

const CategoryPage = ({ params }: CategoryPageProps) => {
  const { slug } = params;

  const createSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  const category = (data.categories as Category[]).find(
    (c: Category) => createSlug(c.name) === slug
  );

  if (!category) {
    notFound();
  }

  return <CategoryPageClient category={category} />;
};

export default CategoryPage;

export async function generateStaticParams() {
  const createSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  return (data.categories as Category[]).map((category: Category) => ({
   params: {
    slug: createSlug(category.name),
   }
  }));
} 