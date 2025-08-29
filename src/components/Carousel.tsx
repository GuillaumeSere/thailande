'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import type { MediaItem } from '../lib/types';

type CarouselProps = {
  media: MediaItem[];
};

const Carousel: React.FC<CarouselProps> = ({ media }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const autoplayRef = useRef(
    Autoplay({ 
      delay: 8000, 
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false
    })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayRef.current]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Fonction pour arrêter l'autoplay quand une vidéo joue
  const handleVideoPlay = useCallback(() => {
    setIsVideoPlaying(true);
  }, []);

  // Fonction pour reprendre l'autoplay quand une vidéo s'arrête
  const handleVideoPause = useCallback(() => {
    setIsVideoPlaying(false);
  }, []);

  // Fonction pour reprendre l'autoplay quand une vidéo se termine
  const handleVideoEnded = useCallback(() => {
    setIsVideoPlaying(false);
  }, []);

  // Effet pour contrôler l'autoplay selon l'état de lecture des vidéos
  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = emblaApi.plugins().autoplay;
    if (!autoplay) return;

    if (isVideoPlaying) {
      // Arrêter l'autoplay
      autoplay.stop();
    } else {
      // Reprendre l'autoplay  
      autoplay.play();
    }
  }, [isVideoPlaying, emblaApi]);

  // Nettoyer les références vidéo quand le composant se démonte
  useEffect(() => {
    return () => {
      videoRefs.current = [];
    };
  }, []);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {media.map((item, index) => (
          <div
            className="embla__slide relative h-[90vh] flex justify-center items-center"
            key={index}
          >
            {item.type === 'image' ? (
              <Image
                src={item.url}
                alt={item.alt}
                width={1920}
                height={1080}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                priority={index === 0}
              />
            ) : item.url.includes('youtube.com/embed') ? (
              <div className="max-w-full h-full flex justify-center items-center">
                <div className="w-full h-0 pb-[56.25%] relative">
                  <iframe
                    src={item.url}
                    title={item.alt}
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
              </div>
            ) : (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={item.url}
                controls
                preload="metadata"
                className="max-w-full max-h-full w-auto h-auto"
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onEnded={handleVideoEnded}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
