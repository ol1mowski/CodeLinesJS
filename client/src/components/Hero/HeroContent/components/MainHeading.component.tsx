import { MobileWrapperH2 } from "../../../UI/MobileWrapper/MobileWrapper.component";

export const MainHeading = () => (
  <MobileWrapperH2
    className="text-4xl md:text-5xl lg:text-6xl font-bold font-space text-[#f7df1e] mb-6"
    motionProps={{
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true }
    }}
  >
    Wejdź do Świata JavaScript
  </MobileWrapperH2>
); 