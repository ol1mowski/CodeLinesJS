import { MobileWrapperP } from '../../../UI/MobileWrapper/MobileWrapper.component';

export const Description = () => (
  <MobileWrapperP
    className="w-full m-auto text-lg text-center md:text-xl xl:ml-0 lg:text-left text-gray-300 font-inter mb-8 max-w-2xl"
    motionProps={{
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: 0.1 },
    }}
  >
    Podejmij wyzwanie i zostań mistrzem JavaScript poprzez wciągającą grę. Rozwiązuj zagadki,
    zdobywaj osiągnięcia i rywalizuj z innymi graczami.
  </MobileWrapperP>
);
