import { memo } from 'react';
import { Container } from '../UI/Container/Container.component';

import { TestimonialCard } from './components/TestimonialCard';
import { SectionHeader } from './components/SectionHeader';
import { SectionBackground } from './components/SectionBackground';
import { CallToAction } from './components/CallToAction';
import { useTestimonials } from './hooks/useTestimonials';


export const TestimonialsSection = memo(() => {
  const testimonials = useTestimonials();

  return (
    <section id="opinie" className="py-20 overflow-hidden bg-gradient-to-b from-dark via-dark-medium to-dark relative">
      <SectionBackground />
      
      <Container>
        <SectionHeader 
          title="Co mówią nasi użytkownicy" 
        />

        <div className="grid grid-cols-1 md:grid-cols-auto gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              avatar={testimonial.avatar}
              index={index}
              linkedIn={testimonial.linkedIn}
            />
          ))}
        </div>

        <CallToAction 
          text="Dołącz do nas" 
          url="/logowanie" 
        />
      </Container>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection'; 