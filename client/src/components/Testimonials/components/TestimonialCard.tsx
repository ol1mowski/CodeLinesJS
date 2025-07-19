import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaLinkedin } from 'react-icons/fa';
import { useMobileDetect } from '../../hooks/useMobileDetect.hook';
import { useAnimationConfig } from '../hooks/useAnimationConfig';
import { Testimonial } from '../hooks/useTestimonials';

type TestimonialCardProps = Testimonial & {
  index: number;
};

export const TestimonialCard = memo(
  ({ content, author, role, avatar, index, linkedIn }: TestimonialCardProps) => {
    const isMobile = useMobileDetect();
    const animations = useAnimationConfig();

    const StarRating = () => (
      <div className="flex mt-2">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <FaStar key={i} className="text-js" />
          ))}
      </div>
    );

    const TestimonialContent = () => (
      <div className="relative rounded-xl p-6 md:p-8 bg-dark-light/30 backdrop-blur-sm border border-js/10 h-full flex flex-col">
        <div className="flex items-start mb-6">
          <div className="shrink-0 mr-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-js">
              <img src={avatar} alt={author} className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-bold text-white">{author}</h3>
              {linkedIn && (
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
                  aria-label={`Profil LinkedIn ${author}`}
                >
                  <FaLinkedin />
                </a>
              )}
            </div>
            <p className="text-gray-400 text-sm">{role}</p>
            <StarRating />
          </div>
        </div>

        <div className="relative mb-6 flex-grow">
          <FaQuoteLeft className="absolute -top-2 -left-1 text-js/20 text-4xl" aria-hidden="true" />
          <p className="text-gray-300 italic pl-6 relative z-10">{content}</p>
        </div>

        <div className="w-1/4 h-1 bg-js/30 rounded-full" aria-hidden="true"></div>
      </div>
    );

    if (isMobile) {
      return <TestimonialContent />;
    }

    return (
      <motion.div
        initial={animations.testimonial.initial}
        whileInView={animations.testimonial.animate}
        transition={animations.testimonial.transition(index)}
        viewport={{ once: true }}
      >
        <TestimonialContent />
      </motion.div>
    );
  }
);

TestimonialCard.displayName = 'TestimonialCard';
