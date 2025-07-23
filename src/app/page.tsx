'use client';

import Link from 'next/link';
import data from '../data/media_updated.json';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';

export default function Home() {
  const { categories } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <PageTransition>
      <div className="container mx-auto p-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-center"
        >
    
        </motion.h1>
        <motion.div
          className="max-w-full m-auto flex flex-wrap justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <motion.div key={category.name} variants={itemVariants}>
              <Link
                href={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="block group"
              >
                <div className="relative box overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <motion.img
                    src={category.media[0]?.url || ''}
                    alt={category.media[0]?.alt || category.name}
                    className="w-full image h-64 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h2 className="text-white text-2xl font-bold">{category.name}</h2>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
} 