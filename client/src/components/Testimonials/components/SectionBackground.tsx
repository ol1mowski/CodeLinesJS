import { BackgroundPattern } from '../../Features/components/BackgroundPattern.component';

export const SectionBackground = () => {
  return (
    <>
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
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-js/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-js/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 right-1/2 transform -translate-x-1/2 w-full h-40 bg-gradient-to-t from-dark to-transparent"></div>
    </>
  );
};
