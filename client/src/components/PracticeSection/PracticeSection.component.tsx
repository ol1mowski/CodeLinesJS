import { Container } from "../UI/Container/Container.component";
import { PracticeContent } from "./components/PracticeContent.component";
import { PracticeHeader } from "./components/PracticeHeader.component";
import { BackgroundPattern } from "../Collaborate/components/BackgroundPattern.component";

export const PracticeSection = () => (
    <section
        id="practice"
        className="min-h-screen w-full bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] py-12 md:py-16 relative overflow-hidden"
    >
        <div className="absolute inset-0">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[#1a1a1a] opacity-90" />
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-20" />
                <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#f7df1e] rounded-full blur-[100px] opacity-10" />
                <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-[#f7df1e] rounded-full blur-[100px] opacity-10" />
            </div>
            <BackgroundPattern />
        </div>

        <Container className="relative z-10">
            <div className="flex flex-col items-center gap-8 md:gap-12">
                <PracticeHeader />
                <PracticeContent />
            </div>
        </Container>

    </section>
); 