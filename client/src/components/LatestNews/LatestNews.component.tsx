import { Container } from '../UI/Container/Container.component';
import { NewsContent } from './components/NewsContent/NewsContent.component';

export const LatestNewsSection = () => (
  <section
    id="nowosci"
    className="relative w-full bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] py-16 md:py-24 overflow-hidden"
    aria-labelledby="latest-news-title"
  >
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[#1a1a1a] opacity-90" />

      <div
        className="absolute left-0 top-0 w-1/4 h-full bg-[#f7df1e]"
        style={{
          clipPath: 'polygon(0 0, 80% 0, 60% 100%, 0 100%)'
        }}
      />

      <div
        className="absolute right-0 bottom-0 w-1/5 h-1/2 bg-[#f7df1e]"
        style={{
          clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)'
        }}
      />

      <div
        className="absolute top-1/4 right-1/4 w-6 h-6 bg-[#f7df1e]"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-[#f7df1e]"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-3 h-3 bg-[#f7df1e]"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}
      />

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
    </div>

    <Container className="relative z-10">
      <NewsContent />
    </Container>
  </section>
); 