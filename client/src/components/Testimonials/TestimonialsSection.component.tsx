import { memo } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../UI/Container/Container.component';
import { FaQuoteLeft, FaStar, FaLinkedin } from 'react-icons/fa';
import { useMobileDetect } from '../../hooks/useMobileDetect';
import { Link } from 'react-router-dom';
import { BackgroundPattern } from '../Features/components/BackgroundPattern.component';

type TestimonialProps = {
    content: string;
    author: string;
    role: string;
    avatar: string;
    index: number;
    linkedIn?: string;
};

const Testimonial = memo(({ content, author, role, avatar, index, linkedIn }: TestimonialProps) => {
    const isMobile = useMobileDetect();

    const renderStars = () => {
        return Array(5)
            .fill(0)
            .map((_, i) => (
                <FaStar key={i} className="text-js" />
            ));
    };

    const testimonialContent = (
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
                            >
                                <FaLinkedin />
                            </a>
                        )}
                    </div>
                    <p className="text-gray-400 text-sm">{role}</p>
                    <div className="flex mt-2">{renderStars()}</div>
                </div>
            </div>

            <div className="relative mb-6 flex-grow">
                <FaQuoteLeft className="absolute -top-2 -left-1 text-js/20 text-4xl" />
                <p className="text-gray-300 italic pl-6 relative z-10">{content}</p>
            </div>

            <div className="w-1/4 h-1 bg-js/30 rounded-full"></div>
        </div>
    );

    if (isMobile) {
        return testimonialContent;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
        >
            {testimonialContent}
        </motion.div>
    );
});

export const TestimonialsSection = memo(() => {
    const testimonials = [
        {
            content:
                "Jako właściciel serwisu chciałbym podkreślić, że nasza platforma to doskonałe miejsce do nauki teorii oraz praktycznego utrwalania wiedzy poprzez angażujące gry edukacyjne. Użytkownicy mogą również śledzić swoje postępy, co motywuje do dalszej nauki. Nieustannie rozwijamy nasz serwis i już wkrótce wprowadzimy nowe funkcje oparte na sztucznej inteligencji, które jeszcze bardziej usprawnią naukę JavaScriptu!",
            author: "Oliwier Markiewicz",
            role: "Twórca CodeLinesJS",
            avatar: "https://res.cloudinary.com/dbbuav0rj/image/upload/v1731069658/Portfolio/images/me_gmqeii.webp",
            linkedIn: "https://www.linkedin.com/in/oliwier-markiewicz-47857228a/",
        },
    ];

    return (
        <section className="py-20 overflow-hidden bg-gradient-to-b from-dark via-dark-medium to-dark relative">
            <Container>
                <div className="absolute inset-0">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 w-full h-full bg-[#1a1a1a] opacity-90" />
                        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
                        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#f7df1e] rounded-full blur-[100px] opacity-10" />
                        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#f7df1e] rounded-full blur-[100px] opacity-10" />
                    </div>
                    <BackgroundPattern />
                </div>
                <div className="text-center mb-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-js font-semibold uppercase tracking-wider">Opinie uczestników</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                            Co mówią nasi użytkownicy
                        </h2>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-auto gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Testimonial
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

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <Link
                        to="/logowanie"
                        className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-js text-dark font-semibold hover:bg-js/90 transition-all duration-300 transform hover:scale-105"
                    >
                        Dołącz do nas
                    </Link>
                </motion.div>
            </Container>

            <div className="absolute -top-20 -right-20 w-64 h-64 bg-js/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -left-32 w-80 h-80 bg-js/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 right-1/2 transform -translate-x-1/2 w-full h-40 bg-gradient-to-t from-dark to-transparent"></div>
        </section>
    );
});

Testimonial.displayName = 'Testimonial';
TestimonialsSection.displayName = 'TestimonialsSection'; 