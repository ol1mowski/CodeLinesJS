type ContainerProps = {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className = '' }: ContainerProps) => (
  <div className={`max-w-[2000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-20 xl:px-24 2xl:px-48 ${className}`}>
    {children}
  </div>
); 