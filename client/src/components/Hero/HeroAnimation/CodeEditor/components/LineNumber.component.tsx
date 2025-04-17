export const LineNumber = ({ number }: { number: number }) => (
  <>
    <span className="text-gray-500 select-none w-8 inline-block">{number}</span>
    <span className="text-gray-400 select-none">│ </span>
  </>
);
