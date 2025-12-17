import { motion } from 'framer-motion';
import Image from 'next/image';
import { HeroCarouselImage } from '../types/hero';
import { handleImageError } from '../services/heroData';

interface InfiniteCarouselRowProps {
    images: HeroCarouselImage[];
    direction: 'left' | 'right';
    duration: number;
}

export default function InfiniteCarouselRow({ images, direction, duration }: InfiniteCarouselRowProps) {
    // Duplicate images multiple times to ensure seamless infinite scroll on large screens
    // 4x duplication to be safe for 4k screens
    const duplicatedImages = [...images, ...images, ...images, ...images];

    return (
        <div className="relative w-full h-[50vh] overflow-hidden bg-black">
            <motion.div
                className="flex h-full"
                style={{ width: "max-content" }}
                animate={{
                    x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
                }}
                transition={{
                    duration: duration,
                    ease: 'linear',
                    repeat: Infinity,
                }}
            >
                {duplicatedImages.map((image, index) => (
                    <div
                        key={`${image.src}-${index}`}
                        className="relative h-full flex-shrink-0"
                        style={{ width: '33vw', height: '50vh' }}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                            onError={(e) => handleImageError(e, image.fallback)}
                            priority={index < 4}
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
