'use client';

import type { Category } from '../lib/types';
import Carousel from './Carousel';
import PageTransition from './PageTransition';
import { motion } from 'framer-motion';

type CategoryPageClientProps = {
  category: Category;
};

const CategoryPageClient: React.FC<CategoryPageClientProps> = ({ category }) => {
  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          {category.name}
        </motion.h1>
        <Carousel media={category.media} />
      </div>
    </PageTransition>
  );
};

export default CategoryPageClient; 