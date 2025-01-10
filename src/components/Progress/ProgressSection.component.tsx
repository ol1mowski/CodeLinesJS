import { Container } from "../UI/Container/Container.component";
import { SectionTitle } from "../UI/SectionTitle/SectionTitle.component";
import { ProgressStats } from "./ProgressStats/ProgressStats.component";
import { LearningChart } from "./LearningChart/LearningChart.component";

export const ProgressSection = () => (
  <section 
    id="postepy" 
    className="min-h-screen w-full bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] py-16 md:py-24 relative overflow-hidden"
  >
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-full h-full bg-[#1a1a1a] opacity-90" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
      
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f7df1e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             backgroundSize: '30px 30px'
           }}
      />
      
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#f7df1e] rounded-full blur-[100px] opacity-10" />
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-[#f7df1e] rounded-full blur-[100px] opacity-10" />
    </div>

    <Container className="relative z-10">
      <div className="flex flex-col items-center gap-12 md:gap-20">
        <SectionTitle
          title="Twoje Postępy"
          subtitle="Śledź swój rozwój w nauce JavaScript"
          className="text-center px-4"
          titleClassName="text-[#f7df1e] drop-shadow-lg"
          subtitleClassName="text-gray-400"
        />
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12 md:gap-16 w-full">
          <ProgressStats />
          <div className="w-full xl:w-1/2">
            <div className="rounded-xl border border-[#f7df1e]/20 bg-[#1a1a1a]/50 backdrop-blur-sm overflow-hidden shadow-xl">
              <LearningChart />
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>
); 