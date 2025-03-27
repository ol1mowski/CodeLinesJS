import { useMemo } from 'react';

export type Testimonial = {
  content: string;
  author: string;
  role: string;
  avatar: string;
  linkedIn?: string;
};


export const useTestimonials = () => {
  const testimonialData = useMemo(() => [
    {
      content:
        "Jako właściciel serwisu chciałbym podkreślić, że nasza platforma to doskonałe miejsce do nauki teorii oraz praktycznego utrwalania wiedzy poprzez angażujące gry edukacyjne. Użytkownicy mogą również śledzić swoje postępy, co motywuje do dalszej nauki. Nieustannie rozwijamy nasz serwis i już wkrótce wprowadzimy nowe funkcje oparte na sztucznej inteligencji, które jeszcze bardziej usprawnią naukę JavaScriptu!",
      author: "Oliwier Markiewicz",
      role: "Twórca CodeLinesJS",
      avatar: "https://res.cloudinary.com/dbbuav0rj/image/upload/v1731069658/Portfolio/images/me_gmqeii.webp",
      linkedIn: "https://www.linkedin.com/in/oliwier-markiewicz-47857228a/"
    }
  ], []);

  return testimonialData;
}; 