'use client'

import { propsgetProduct } from "../page";
import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";
import HeroSection from "./HeroSection";
import PromoBanner from "./PromoBanner";
import { motion } from 'motion/react'

interface propsControl {
    respodaw: propsgetProduct[];
}

export default function Control({ respodaw }: propsControl) {
    return (
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
        >
            <HeroSection />
            <FeaturedProducts
                respodaw={respodaw}
            />
            <Categories />
            <PromoBanner />
        </motion.div>
    )
}