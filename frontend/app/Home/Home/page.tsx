'use client'

import Categories from "./componentspage/Categories";
import FeaturedProducts from "./componentspage/FeaturedProducts";
import HeroSection from "./componentspage/HeroSection";
import PromoBanner from "./componentspage/PromoBanner";
import { motion } from 'motion/react'

export default function Homepage() {
    return (
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            className="relative flex flex-col min-h-screen">
            <main className="flex-1">
                <HeroSection />
                <FeaturedProducts />
                <Categories />
                <PromoBanner />
               
            </main>
        </motion.div>
    )
}